<template>
  <div class="comment-card">
    <div style="margin: 10px 10px">
      <p style="color:grey;text-align:left">
       {{comment.commentDate.substring(0,10)}} {{author}}：
      </p>
      <p style="color:black;font-size:18px;">
        {{comment.commentContent}}
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
    this.axios.post('/api/user/searchUserNickName', {userId: this.comment.commentAuthorId}).then(body => {
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
