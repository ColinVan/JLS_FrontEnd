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

  // 组件生命周期详见https://www.cnblogs.com/qidh/p/11431998.html
  mounted () {
    this.axios.get('/api/chapter/list').then(body => { this.contents = body.data })
  },

  // 关于vue的watch侦听器,详见官方文档:https://cn.vuejs.org/v2/guide/computed.html
  // 该侦听器的作用是 当用户点击左侧学习导航条导致网址出现变化时 通过截取网址后段内容并组成http请求报文发送给后端请求新的学习内容
  watch: {
    '$route' (to, from) {
      // JavaScript中stringObject.lastIndexOf(searchvalue,fromindex)方法
      // 表示一个指定的字符串值最后出现的位置
      // alert('this.$route.path is: ' + this.$route.path)
      // let index = this.$route.path.lastIndexOf('/')
      const index = to.path.lastIndexOf('/')

      // JavaScript中stringObject.substring(start,stop)方法
      // 表示截取字符串中介于两个指定下标之间的字符
      const para = to.path.substring(index + 1, this.$route.path.length)
      console.log(para)

      let url = '/api/chapter/list'
      if (para !== 'learn' && para !== '') {
        url += '/sort/' + para
      }
      console.log(url)
      alert(url) // for example: /api/chapter/list/sort/basic
      // axios有get和post两种方法 其中post比get要多传一个数据对象 回调函数都是body=>{xxx}
      this.axios.get(url).then(body => { this.contents = body.data })
    }
  }
}
</script>

<style scoped>
</style>
