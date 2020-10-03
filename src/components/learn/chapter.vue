<template>
<!--v-outline:一个Vue开发小工具，使用非常简单，你可以使用它来提取页面中一篇文章的标题，并生成目录树。-->
  <div v-outline="{
    callback: refreshNavTree,
    selectors: ['h1', 'h2'],
    exceptSelector: '[un-nav]'}">

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
    <div style="width: 75%;margin:10px 0px;">
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

    <!--导航-->
    <div class="navigation" v-if="isNavigationDisplay">
      <el-tree :data="navTree" :highlight-current="true" :default-expand-all="true" class="tree">
        <div slot-scope="{ data }">
          <div class="node-render-content" @click.stop="jumpToAnchor(data.id)">
            {{getIndex(data)}}
            {{ data.title }}
          </div>
        </div>
      </el-tree>
    </div>

  </div>
</template>

<script>
export default {
  name: 'chapter',
  data () {
    return {
      content: '',
      navTree: [],
      isLearn: false,
      isNavigationDisplay: false
    }
  },
  // 注意：只有当组件在 <keep-alive> 内被切换，才会有activated 和 deactivated 这两个钩子函数
  // 具体见https://www.jianshu.com/p/0272c0fe9392
  activated () {
    window.addEventListener('scroll', this.handleScrollStart)
    this.isNavigationDisplay = false
    const index = this.$route.path.lastIndexOf('/')
    const para = this.$route.path.substring(index + 1, this.$route.path.length)
    const url = '/api/chapter/' + para
    console.log(url)
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
  deactivated () {
    window.removeEventListener('scroll', this.handleScrollStart)
  },

  methods: {
    refreshNavTree (treeData) {
      this.navTree = treeData
    },

    // v-outline组件所必须的函数
    jumpToAnchor (id) {
      let element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
      }
    },
    // 导航栏里面每一章节前面的数字序号
    getIndex (data) {
      if (this.navTree.indexOf(data) >= 0) {
        return this.navTree.indexOf(data) + 1 + '.'
      } else {
        for (let i = 0; i < this.navTree.length; i++) {
          if (this.navTree[i].children.indexOf(data) >= 0) {
            return (i + 1).toString() + '.' + (this.navTree[i].children.indexOf(data) + 1)
          }
        }
      }
    },
    handleScrollStart () {
      // let navigation=document.getElementsByClassName('navigation')'navigation' is assigned a value but never used.
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop < 400) {
        this.isNavigationDisplay = false
      } else {
        this.isNavigationDisplay = true
      }
    },
    // 学会了->已学习
    hasLearn () {
      this.axios.post('/api/user/progress/add', 
      {
        token: this.$store.getters.getToken,
        chapterid: this.content.chapterid
      }).then(body => { this.isLearn = true })
    }
  },

  computed: {
    prop () {
      let chapterdata = {
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

  .tree {
    background: #fbfbfb;
    width: 250px;
  }

  .hasLearnDiv {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px
  }
</style>
