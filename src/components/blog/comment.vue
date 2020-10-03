<template>
  <div class="comment-card">
    <div style="margin: 10px 10px">
      <p style="color:grey;text-align:left">
       {{comment.commentdate.substring(0,10)}} {{author.nickname}}：
      </p>
      <p style="color:black;font-size:18px;">
        {{comment.commentcontent}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment',

  data () {
    return {
      author: ''
    }
  },

  mounted () {
    this.axios.get('/api/user/byId/' + this.comment.commentauthorid).then(body => {
      this.author = body.data
    })
  },

  props: ['comment']
}
</script>

<style scoped>
  .comment-card {
    margin: 20px auto;
    height: auto;
    border: #409EFF;
    background: white;
  }
</style>
