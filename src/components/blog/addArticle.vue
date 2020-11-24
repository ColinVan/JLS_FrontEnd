<template>
  <div class="edit">
    <div>
      <label>请输入标题:</label>
      <br>
      <el-input
        v-model="title"
        style="margin-bottom: 10px"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 6}"
        placeholder="输入标题"
      >
      </el-input>
      <hr>
      <label>请输入文章摘要:</label>
      <br>
      <el-input
        v-model="introduction"
        style="margin-bottom: 10px"
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 6}"
        placeholder="输入简介"
      >
      </el-input>
    </div>
    <hr>
    <label>请选择文章类型:</label>
    <br>
    <div style="margin-bottom: 10px">
      <el-radio v-model="type" label="分享" @click="alert(type)">分享</el-radio>
      <el-radio v-model="type" label="提问" @click="alert(type)">提问</el-radio>
    </div>
    <div>
      <mavon-editor v-model="content"
        style="z-index: 2"
        class="md"
      ></mavon-editor>
    </div>
    <div class="submit">
      <el-button type="primary" icon="el-icon-edit" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addArticle',
  data () {
    return {
      content: '',
      title: '',
      introduction: '',
      type: ''
    }
  },
  computed: {
    prop () {
      const articledata = {
        subfield: false,
        defaultOpen: 'preview',
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      }
      return articledata
    }
  },
  methods: {
    submit () {
      alert(JSON.parse(this.$store.getters.getToken).token)
      this.axios.post('/api/addarticle', {
          title: this.title,
          introduction: this.introduction,
          content: this.content,
          type: this.type
        }, {
          headers: {
            'Authorization': JSON.parse(this.$store.getters.getToken).token
          }
        }
      ).then(body => {
        alert('发布成功!')
        // 刷新当前文档
        location.reload()
        // this.$router.push()实现路由跳转
        this.$router.push('/blog')
      })
    }

  }
}
</script>

<style scoped>
  .edit {
    margin-top: 80px !important;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  }

  .md {
    height: 800px;
  }

  .submit {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px
  }
</style>
