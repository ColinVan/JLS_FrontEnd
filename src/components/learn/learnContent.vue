<!--该组件代表每一张学习卡片 涉及到vue组件生命周期函数mount, 前后端交互工具axios和vue监听功能watch-->
<template>
  <div>
    <div v-for="(item, index) in contents" v-bind:key="index" width="100%" height="80px">
      <router-link :to="{path:'chapter/'+item.chapterid}">
        <el-row :gutter="20">
          <el-col :xs="0" :sm="6" :md="6">
              <img :src="item.chapterimg" width="100%" height="100%">
          </el-col>

          <el-col :xs="24" :sm="18" :md="18">
              <h2>{{item.chaptername}}</h2>
            <p style="color: darkgrey;font-size: 16px;">{{item.chapterintroduction}}</p>
          </el-col>
        </el-row>
      </router-link>
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  name: 'learnContent',
  data () {
    return {
      contents: []
    }
  },
  mounted () {
    this.axios.get('/api/chapter/list').then(body => { this.contents = body.data })
  },
  watch: {
    '$route' (to, from) {
      const para = to.path.substring(to.path.lastIndexOf('/') + 1, this.$route.path.length)
      if (from.path.substring(0, 6) === '/learn' && to.path.substring(0, 6) === '/learn') {
        alert('from.path is: ' + from.path + '\nto.path is: ' + to.path + '\npara in learnContent is: ' + para)
        const url = '/api/chapter/list/sort/' + para // for example: /api/chapter/list/sort/basic
        // axios有get和post两种方法 其中post比get要多传一个数据对象 回调函数都是body=>{xxx}
        this.axios.get(url).then(body => { this.contents = body.data })
      }
    }
  }
}
</script>

<style scoped>
</style>
