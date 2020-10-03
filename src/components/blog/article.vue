<template>
  <div style="width: 100%">
    <!--页首大图-->
    <div style="textAlign:center;height:300px;zIndex:2;">
      <img src="../../assets/night.jpg">
      <!--letter-spacing设置字母间距属性-->
    </div>
    <hr>
    <h1 font-size="96px">{{article.articletitle}}</h1>
    <!--帖子的主要部分,包括正文和下方评论-->
    <el-row :gutter="10">
      <el-col :xs="24" :sm="18" :md="18">
        <div style="margin-bottom: 10px;">
          <mavon-editor
            style="z-index: 2"
            class="md"
            :value="article.articlecontent"
            :subfield="prop.subfield"
            :defaultOpen="prop.defaultOpen"
            :toolbarsFlag="prop.toolbarsFlag"
            :editable="prop.editable"
            :scrollStyle="prop.scrollStyle"
          ></mavon-editor>
        </div>
        <hr>

        <!--写评论-->
        <div style="background: #fbfbfb;width:100%;margin: auto">
          <h5>
            共 {{this.comments.length}} 条评论
          </h5>
          <el-input
            v-model="input"
            style="margin-bottom: 10px"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="留下你的评论(请限制在1000字以内)"
          >
          </el-input>
          <div span="24">
            <el-button type="primary" v-if="this.$store.getters.isLogin" @click="addComment">提交</el-button>
            <!--该router-link同样对应app中的router-view-->
            <RouterLink to="/login">
              <el-button type="text" v-if="!this.$store.getters.isLogin">请先登录</el-button>
            </RouterLink>
          </div>
          <hr>
          <!--评论显示列表 comment.vue 采用父子组件传值的方法 父组件把服务器发来的每一条评论信息(是一个对象)传给子组件-->
          <div v-for="(comment, index) in comments" v-bind:key="index">
            <comment :comment="comment"></comment>
          </div>

        </div>
      </el-col>

      <!--帖子的侧边栏部分,写博主的个人资料-->
      <el-col :xs="0" :sm="6" :md="6" border-style="solid" border-width="5px" bordercolor="#000000">
        <div>
          <h3>  公告</h3>
          <hr>
          <div width="50%" height="100px">
            <img src="../../assets/dalao.jpg">
          </div>
          <p>  博主:{{user.nickname}}</p>
          <p>  发表时间:{{article.articledate.substring(0,10)}}</p>
          <p>  阅读量:{{article.articlereadnum}}</p>
          <p>  评论量:{{article.articlecommentnum}}</p>
        </div>
        <hr>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Comment from './comment'

export default {
  name: 'article',
  components: { Comment },
  data () {
    return {
      article: '',
      user: '',
      comments: [],
      input: '',
      author: '',
      dateValue: new Date()
    }
  },
  activated () {
    const index = this.$route.path.lastIndexOf('/')
    const para = this.$route.path.substring(index + 1, this.$route.path.length)
    const url = '/api/article/' + para
    // 先得到article对象
    this.axios.get(url).then(body => {
      this.article = body.data
      const urlUser = '/api/user/byId/' + this.article.articleauthor
      const urlComment = '/api/comment/list/sort/' + this.article.articleid
      // 再得到作者相关信息
      this.axios.get(urlUser).then(body => {
        this.user = body.data
        if (this.article.articletype === '分享') {
          this.color = '#409EFF'
        }
      })
      // 与请求作者相关信息的同时 请求评论相关信息
      this.axios.get(urlComment).then(body => {
        this.comments = body.data
      })
    })
  },
  methods: {
    addComment () {
      if (this.input !== '') {
        this.axios.post('/api/comment/add', {
          content: this.input,
          articleid: this.article.articleid,
          token: this.$store.getters.getToken
        }).then(body => { location.reload() })
        alert('评论成功!')
      } else {
        alert('请输入你的评论后再提交')
      }
    }
  },
  computed: {
    prop () {
      const articledata = {
        subfield: false, // 单双栏模式
        defaultOpen: 'preview', // edit: 默认展示编辑区域, preview: 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      }
      return articledata
    }
  }
}

</script>
