<template>
  <div id="app">
    <el-container direction="vertical">
      <!--direction="vertical"这是为了让container布满整个页面-->
      <!--具体见https://blog.csdn.net/qq_36275889/article/details/94634397-->

      <HeadNav v-if="header_show">Header</HeadNav>

      <keep-alive>
        <!--keep-alive是Vue提供的一个抽象组件，用来对组件进行缓存，从而节省性能，由于是一个抽象组件，所以在v页面渲染完毕后不会被渲染成一个DOM元素-->
        <!--具体见https://www.jianshu.com/p/4b55d312d297-->
        <router-view v-on:public_header="public_header"
                     v-on:public_footer="public_footer"
                     style="margin-top: 55px"
        >Main</router-view>
        <!--关于router-view的属性的具体用法,见https://blog.csdn.net/xxtnt/article/details/96281345-->
        <!--v-on本来是vue用于绑定事件的方法,详见https://www.jianshu.com/p/5d2ca05b70b3-->
        <!--v-on也可用来绑定自定义事件,这是子组件向父组件传值的策略.自定义事件是子组件的一个方法,该自定义事件作为一属性,它的属性值是父组件的一个方法.-->
        <!--该自定义方法被执行时,通过子组件中该方法定义的this.$emit('该方法名')实现事件触发-->
        <!--详见https://www.cnblogs.com/return00/p/9795028.html-->
      </keep-alive>

      <myfooter v-if="footer_show">footer</myfooter>

    </el-container>
  </div>
</template>

<script>
import HeadNav from './components/HeadNav'
import myfooter from './components/footer'

export default {
  name: 'App',
  data () {
    return {
      header_show: true,
      footer_show: true
    }
  },
  components: {
    HeadNav,
    myfooter
  },
  methods: {
    // 是否显示头部
    public_header: function (bool) {
      this.header_show = bool
    },
    // 是否显示底部
    public_footer: function (bool) {
      this.footer_show = bool
    }
  }

}
</script>

<style>
  #app {
    padding: 0;

    margin: 0;

    position: absolute;

    top: 0;

    left: 0;

    width: 100%;

    height: 100%;

    border: hidden;
  }
</style>
