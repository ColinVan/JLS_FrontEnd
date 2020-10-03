<template>
  <el-header class="header">
    <!--gutter属性为栅格间隔, 默认值为0-->
    <el-row :gutter="10" style="width: 100%">

      <!--导航条中的logo-->
      <el-col :xs="20" :sm="4" :md="4">
        <router-link to="/">
          <img src="../assets/newlogo.png">
        </router-link>
      </el-col>

      <!--导航条中的真正导航条部分,各个选项卡-->
      <el-col :xs="0" :sm="12" :md="14">
        <!--element-ui中规定的导航条为el-menu-->
        <!--详情可见https://element.eleme.cn/#/zh-CN/component/menu-->
        <el-menu router :default-active="$route.path" class="el-menu-demo" mode="horizontal" background-color="#000000">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/learn">学习</el-menu-item>
          <el-menu-item index="/blog">博客</el-menu-item>
          <el-menu-item index="/practice">题库</el-menu-item>
          <el-menu-item index="/code">编程</el-menu-item>
        </el-menu>
      </el-col>

      <!--导航条右侧的搜索输入框-->
      <el-col :xs="0" :sm="6" :md="4">
        <el-input v-model="input" placeholder="请输入内容" class="search-input" prefix-icon="el-icon-search"></el-input>
        <el-button type="primary" icon="el-icon-search" v-on:click="newtest"></el-button>
      </el-col>

      <!--导航条右侧的{登录注册}{个人中心}-->
      <el-col :xs="4" :sm="2" :md="2">

        <!--this.$store涉及到vuex数据"仓库",见src/stroe/index.js-->
        <div v-if="!this.$store.getters.isLogin" class="user-div">
          <router-link to="/login">
            <el-button round size="small">登录</el-button>
          </router-link>
        </div>

        <div v-if="this.$store.getters.isLogin" class="user-info">
          <router-link to="/info">
            <el-col span="8">
            </el-col>
            <el-col span="16">
            <el-button round size="small">个人信息</el-button>
            </el-col>
          </router-link>
        </div>

      </el-col>

    </el-row>
  </el-header>
</template>

<script>

export default {
  data () {
    return {
      input: ''
    }
  },
  methods: {
    newtest () {
      alert(this.input)
      if (this.input !== '') {
        this.axios.post('/api/search', { keyword: this.input }).then(body => {
          console.log(body.data.message)
          alert(body.data.message)
        })
      }
    }
  }
}
</script>

<style scoped>
  .header {
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
    background: black;
    position: fixed;
    width: 100%;
    z-index: 10;
  }

  .search-input {
    margin-top: 10px;
    width: 60%;
  }

  .user-div{
    margin-top: 10px;
    /* position: absolute;*/
  }
  .user-info{
    margin-top: 10px;
    /* position: absolute;*/
  }

</style>
