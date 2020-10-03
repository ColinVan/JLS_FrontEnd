<template>
  <el-container class="footer-container">
    <!--el-main是element-ui中的布局容器,除此之外还有el-header, el-aside, el-footer-->
    <el-main class="footer-main" style="color: darkgray;text-align:center;">
      <p>Design by ColinVan, USTC SSE</p>
      <p>Contact us :colinv@mail.ustc.edu.cn</p>
      <div>
        <button @click="showroute">Show route</button>
        <button @click="showrouter">Show this.$router</button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data () {

  },
  methods: {
    showroute () {
      alert('showroute')
      console.log(this.$route)
    },
    showrouter () {
      alert('showrouter')
      console.log(this.$router)
    }
  }

}
</script>

<style scoped>
  .footer-container{
    position: relative;
    background: black;
  }

  .footer-main{
    position: relative;
    /* line-height:行高属性*/
    /* line-height: 40px;*/
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-size: medium;
  }
</style>
