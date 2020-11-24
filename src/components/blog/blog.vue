<template>
  <div>
    <!--页首大图-->
    <div>
      <div>
        <img src="../../assets/pink.png" style="margin-top: 3px;width: 100%">
      </div>
      <el-col :xs="0" :sm="24" class="welcome-introduce">
        <p style="color: black;font-size: 56px;">Blog</p>
        <p style="color: black;font-size: 16px;">Share your knowledge, experience and insights with your peers!</p>
        <!--该router-link对应app中的router-view-->
        <router-link to="/addArticle">
          <el-button v-if="this.$store.getters.isLogin" type="success" icon="el-icon-edit" circle>点击此处发帖</el-button>
        </router-link>
      </el-col>
    </div>

    <!--旧版：博客帖子内容-->
    <div>
      <div v-for="(item, index) in currentArticle" v-bind:key="index">
        <!--blog-card组件是blog组件的子组件,父组件向子组件传值,需要用子组件的自定义属性-->
        <!--在本例中,父组件将item变量传给子组件,子组件收到该变量的值后,可以用article作为其变量名来调用它.-->
        <blog-card :article="item"></blog-card>
        <hr>
      </div>
    </div>

    <!--表格下方的分页栏目-->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="articles.length"
      style="text-align: center">
    </el-pagination>

  </div>
</template>

<script>
import BlogCard from './blog-card'

export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      articles: [],
      currentArticle: []
    }
  },
  mounted () {
    this.axios.get('/api/articleList').then(body => { this.articles = body.data; this.changeCurrentArticle() })
  },

  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`)
      this.changeCurrentArticle()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
      this.changeCurrentArticle()
    },
    // 只在blog组件一开始渲染的时候向服务器请求一次帖子数据 以后每次翻页都只显示currentArticle数组中的部分内容
    changeCurrentArticle () {
      this.currentArticle = this.articles.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  components: {
    BlogCard
  }
}
</script>

<style scoped>
  .welcome-introduce {
    z-index: 2;
    position: absolute;
    top: 6%;
    width: auto;
    height: 500px;
    margin-left: 20%;
    margin-right: 20%;
    padding-left: 10%;
    padding-right: 10%;
    font-family: Arial, Helvetica, sans-serif;

    text-align: center;
  }
</style>
