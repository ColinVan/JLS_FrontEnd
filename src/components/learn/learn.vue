<!--学习页面分为两部分,左侧为学习章节的导航条,右侧为每个章节内的学习内容列表-->
<template>
  <div>
    <div>
        <div>
          <img src="../../assets/learn.jpg" style="margin-top: 3px;width: 100%">
        </div>
        <el-col :xs="0" :sm="24" class="welcome-introduce">
            <p style="color: aliceblue;font-size: 56px;">Enjoy your learning!</p>
            <p style="color: aliceblue;font-size: 16px;">Start from scratch to learn java foundation, online self-study, fast step!</p>
        </el-col>
    </div>
    <el-row :gutter="10">
      <!--学习章节导航条,占页面左侧六分之一-->
      <el-col :xs="4" :sm="4" :md="4" class="menu-col">
        <!--el-menu的default-active属性表示该导航条默认显示哪个组件-->
        <el-menu class="learn-menu" default-active="/learn/basic" router=true>

          <el-menu-item index="/learn/basic" class="menu-item">
            <span slot="title">Java基础</span>
          </el-menu-item>

          <el-menu-item index="/learn/junior" class="menu-item">
            <span slot="title">Java初级</span>
          </el-menu-item>

          <el-menu-item index="/learn/middle" class="menu-item">
            <span slot="title">Java中级</span>
          </el-menu-item>

          <el-menu-item index="/learn/senior" class="menu-item">
            <span slot="title">Java高级</span>
          </el-menu-item>

          <el-menu-item index="/learn/apply" class="menu-item">
            <span slot="title">Java应用</span>
          </el-menu-item>

          <el-menu-item index="/learn/fore" class="menu-item">
            <span slot="title">前端部分</span>
          </el-menu-item>

          <el-menu-item index="/learn/j2ee" class="menu-item">
            <span slot="title">J2EE</span>
          </el-menu-item>

          <el-menu-item index="/learn/frame" class="menu-item">
            <span slot="title">Java框架</span>
          </el-menu-item>

          <el-menu-item index="/learn/tool" class="menu-item">
            <span slot="title">工具&中间件</span>
          </el-menu-item>

          <el-menu-item index="/learn/database" class="menu-item">
            <span slot="title">数据库</span>
          </el-menu-item>

          <el-menu-item index="/learn/database" class="menu-item">
            <span slot="title">数据结构与算法</span>
          </el-menu-item>

          <el-menu-item index="/learn/database" class="menu-item">
            <span slot="title">Android开发专题</span>
          </el-menu-item>

          <el-menu-item index="/learn/database" class="menu-item">
            <span slot="title">云计算专题</span>
          </el-menu-item>

          <el-menu-item index="/learn/database" class="menu-item">
            <span slot="title">Java爬虫专题</span>
          </el-menu-item>

          <el-menu-item index="/learn/database" class="menu-item">
            <span slot="title">区块链专题</span>
          </el-menu-item>

        </el-menu>
      </el-col>

      <!--学习页面的主要部分,它显示每一章节的学习内容-->
      <el-col :xs="20" :sm="20" :md="20">
        <keep-alive>
          <router-view>Content</router-view>
        </keep-alive>
      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
/* 左侧的学习内容导航栏 靠近页面左侧 */
.learn-menu {
  margin: 5%;
  padding: 10%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  text-align: left;
}

.menu-item {
  /* border-spacing 属性设置相邻单元格的边框间的距离*/
  font-size: 20px;
  border-spacing: 20px;
}

  .welcome-introduce {
    z-index: 2;
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
</style>
