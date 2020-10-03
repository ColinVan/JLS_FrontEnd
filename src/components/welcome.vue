<template>
  <div>

    <!--首页大图,可以改成轮播图,也可以把它转到HeadNav.vue去-->
    <div>
      <img src="../assets/sky.jpg" style="margin-top: 3px;width: 100%">
    </div>

    <!--首页大图上的文字-->
    <el-col :xs="0" :sm="24" :md="24" class="welcome-introduce">
        <p style="color: aliceblue;font-size: 56px;">Java Learning System</p>
        <p style="color: aliceblue;font-size: 16px;">A simple, easy-to-use and efficient Java learning platform for beginners</p>
        <!--round 和 type 都是element-ui中对el-button的属性设置,不是很重要-->
        <router-link to="/about">
          <el-button>了解更多</el-button>
        </router-link>
    </el-col>

    <!--首页大图下面的三个卡片,可以用响应式页面改进-->
    <div class="welcome-cards">
      <el-row gutter="5">

        <el-col :xs="24" :sm="24" :md="6">
          <div class="box-card">
            <h2>开始学习</h2>
            <img src="../assets/newstudy.png">
            <p style="font-size: 16px;">从零开始学习Java基础,在线自学,快人一步!</p>
            <router-link to="/learn">
              <el-button round><i class="el-icon-edit"></i>开始学习</el-button>
            </router-link>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="6">
          <div class="box-card" shadow="always">
            <h2>交流讨论</h2>
            <img src="../assets/newblog.png">
            <p style="font-size: 16px;">与小伙伴们共同学习，提问分享，各抒己见</p>
            <router-link to="/blog">
              <el-button round><i class="el-icon-check"></i>打开论坛</el-button>
            </router-link>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="6">
          <div class="box-card" shadow="always">
            <h2>题库训练</h2>
            <img src="../assets/newtest.png">
            <p style="font-size: 16px;">在这里找到大厂面试海量真题,考验你的Java真实功底!</p>
            <router-link to="/practice">
              <el-button round><i class="el-icon-check"></i>开始测试</el-button>
            </router-link>
          </div>
        </el-col>

        <el-col :xs="24" :sm="24" :md="6">
          <div class="box-card" shadow="always">
            <h2>在线编程</h2>
            <img src="../assets/newcoding.png">
            <p style="font-size: 16px;">这里有最可靠的在线编程平台,简便易用!</p>
            <router-link to="/code">
              <el-button round><i class="el-icon-document"></i>在线编程</el-button>
            </router-link>
          </div>
        </el-col>

      </el-row>
    </div>

  </div>
</template>

<script>
export default {
  computed: {
    toStudyLink: function () {
      return this.$store.getters.isLogin ? '/learn' : '/login'
    }
  }
}
</script>

<style scoped>

  .welcome-introduce {
    /* z-index 属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。*/
    z-index: 2;
    /* position:absolute + left + top 三属性负责给元素在网页中定位 */
    /* position属性的可能值:
      * static:默认值,不脱离文档流;fixed:脱离文档流,相对于浏览器窗口定位;
      * absolute:相对于其第一个static定位的父元素定位;
      * relative:相对于其在文档流的正常位置定位 */
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

  .welcome-cards {
    /* width:100%;*/
    margin-top: 50px;
    text-align: center;
  }

  .box-card {
    /* width: 75%;*/
    height: 350px;
    background: #fbfbfb;
    margin-bottom: 50px;
    /* border-radius 圆角边框属性 */
    /* border-radius: 10px;*/
    /* box-shadow: 8px 8px 8px 8px rgba(.12, .12, .12, .12);*/
  }

</style>
