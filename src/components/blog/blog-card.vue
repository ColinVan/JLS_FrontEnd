<template>
<!--子组件从父组件收到每一个item值,下面的article变量就是对item的引用-->
<!--把每一张卡片视为一大行,左侧为图片右侧为文字,右侧拆成三小行-->
<el-row height="100px">
      <el-col :xs="0" :sm="4" :md="4">
        <div overflow="hidden">
          <img :src=article.articleimg width="100%" height="200px">
        </div>
      </el-col>

      <el-col :xs="24" :sm="20" :md="20">
        <div>
          <!--第一行:帖子标题和阅读数+评论数-->
          <el-row>
            <el-col :xs="24" :sm="20" :md="20">
              <!--该router-link对应app中的router-view-->
              <router-link :to="{path:'/article/'+article.articleid}"  style="text-decoration: none;color: #4169E1;" replace>
                <h3 style="text-align: left;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                  【{{article.articletype}}】{{article.articletitle}}
                </h3>
              </router-link>
            </el-col>
            <el-col :xs="0" :sm="4" :md="4">
              <p style="text-align:right">
                {{article.articlereadnum}} 阅读,{{article.articlecommentnum}} 评论
              </p>
            </el-col>
          </el-row>
          <!--第二行：帖子摘要-->
          <el-row>
            <el-col :xs="24" :sm="24" :md="24">
              <p style="text-align: left;overflow: hidden;font-size:12px;color:#778899;">
                {{article.articleintroduction}}
              </p>
            </el-col>
          </el-row>
          <!--第三行:作者和日期-->
          <br><br><br><br>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24">
              <span style="text-align:left;overflow: hidden;font-size:12px;color:#778899;">
                <i class="el-icon-edit"></i>{{user.nickname}}/{{article.articledate.substring(0,10)}}
              </span>
            </el-col>
          </el-row>
        </div>
      </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      user: ''
    }
  },
  mounted () {
    this.axios.get('/api/user/byId/' + this.article.articleauthor).then(body => { this.user = body.data })
  },
  props: ['article']
}
</script>

<style scoped>
  .blog-card {
    text-align: center;
    height: 180px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
</style>
