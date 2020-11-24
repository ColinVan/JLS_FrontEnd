<template>
<el-row height="100px">
      <el-col :xs="0" :sm="4" :md="4">
        <div overflow="hidden">
          <img :src=article.articleImg width="100%" height="200px">
        </div>
      </el-col>

      <el-col :xs="24" :sm="20" :md="20">
        <div>
          <!--第一行:帖子标题和阅读数+评论数-->
          <el-row>
            <el-col :xs="24" :sm="20" :md="20">
              <!--该router-link对应app中的router-view-->
              <router-link :to="{path:'/article/'+article.articleId}"  style="text-decoration: none;color: #4169E1;" replace>
                <h3 style="text-align: left;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
                  【{{article.articleType}}】{{article.articleTitle}}
                </h3>
              </router-link>
            </el-col>
            <el-col :xs="0" :sm="4" :md="4">
              <p style="text-align:right">
                {{article.articleReadNum}} 阅读,{{article.articleCommentNum}} 评论
              </p>
            </el-col>
          </el-row>
          <!--第二行：帖子摘要-->
          <el-row>
            <el-col :xs="24" :sm="24" :md="24">
              <p style="text-align: left;overflow: hidden;font-size:12px;color:#778899;">
                {{article.articleIntroduction}}
              </p>
            </el-col>
          </el-row>
          <!--第三行:作者和日期-->
          <br><br><br><br>
          <el-row>
            <el-col :xs="24" :sm="24" :md="24">
              <span style="text-align:left;overflow: hidden;font-size:12px;color:#778899;">
                <i class="el-icon-edit"></i>{{user}}/{{article.articleDate.substring(0,10)}}
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
    this.axios.post('/api/user/searchUserNickName', { userId: this.article.articleAuthor }).then(body => { this.user = body.data })
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
