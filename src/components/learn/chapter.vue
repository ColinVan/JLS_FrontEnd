<template>
  <div>
    <!--页首的图片,这里的style用的是v-bind绑定比较复杂.-->
    <div
      v-bind:style="{backgroundImage:'url(' + content.chapterimg + ')',
       backgroundSize:'cover',
       backgroundPosition:'center',
       backgroundRepeat:'repeat',
       webkitFilter:'blur(6px) brightness(0.7)',
       width:'100%',
       height:'350px',
       position:'absolute',
       }"></div>

    <!--图片上的两行小字-->
    <div style="text-align:center;position: relative;width: 100%;height:350px;z-index: 2;">
      <p style="color: aliceblue;font-size: 40px;position: relative;margin: auto;padding-top: 100px;letter-spacing: 5px">
        {{content.chaptername}}
      </p>
      <p style="color: aliceblue;font-size: 12px;letter-spacing: 2px">
        {{content.chapterreadnum}} View in {{content.chaptertype}}
      </p>
    </div>

    <!--正文;mavon-editor是一款基于vue的markdown编辑器-->
    <div style="width: 100%;margin:10px 0px;">
      <mavon-editor
        style="z-index: 2"
        class="md"
        :value="content.chaptercontent"
        :subfield="prop.subfield"
        :defaultOpen="prop.defaultOpen"
        :toolbarsFlag="prop.toolbarsFlag"
        :editable="prop.editable"
        :scrollStyle="prop.scrollStyle"
      ></mavon-editor>
      <div class="hasLearnDiv" v-if="this.$store.getters.isLogin">
        <el-button type="primary" v-if="!this.isLearn" icon="el-icon-edit" @click="hasLearn">学会了</el-button>
        <el-button :disabled="true" v-if="this.isLearn" type="success" icon="el-icon-check">已学习</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chapter',
  data () {
    return {
      content: '',
      isLearn: false
    }
  },
  // 注意：只有当组件在 <keep-alive> 内被切换，才会有activated 和 deactivated 这两个钩子函数
  // 具体见https://www.jianshu.com/p/0272c0fe9392
  activated () {
    // for example: now this.$route.path is: /learn/chapter/6
    const url = '/api/chapter/' + this.$route.path.substring(this.$route.path.lastIndexOf('/') + 1, this.$route.path.length)
    alert('url in chapter is: ' + url) // /api/chapter/6
    this.axios.get(url).then(body => {
      this.content = body.data

      this.axios.get('/api/user/progress/query', {
        params: {
          token: this.$store.getters.getToken,
          chapterid: this.content.chapterid
        }
      }).then(body => {
        console.log(body.data)
        this.isLearn = body.data
      })
    })
  },
  methods: {
    // 学会了->已学习
    hasLearn () {
      this.axios.post('/api/user/progress/add', {
        token: this.$store.getters.getToken,
        chapterid: this.content.chapterid
      }).then(body => { this.isLearn = true })
    }
  },

  computed: {
    prop () {
      const chapterdata = {
        subfield: false,
        defaultOpen: 'preview',
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      }
      return chapterdata
    }
  }
}
</script>

<style scoped>
  .navigation {
    z-index: 10;
    right: 100px;
    top: 150px;
    text-align: left;
    position: fixed;
    width: 250px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

  }

  /*.tree {
    background: #fbfbfb;
    width: 250px;
  }*/

  .hasLearnDiv {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px
  }
</style>
