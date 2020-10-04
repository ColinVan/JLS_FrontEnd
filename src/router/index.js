import Vue from 'vue'
import VueRouter from 'vue-router'

import Welcome from '../components/welcome'
import Login from '../components/login'
import Register from '../components/register'

import Learn from '../components/learn/learn'
import learnContent from '../components/learn/learnContent'
import Chapter from '../components/learn/chapter'

import Blog from '../components/blog/blog'
import Article from '../components/blog/article'
import AddArticle from '../components/blog/addArticle'

import Practice from '../components/question/practice'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/learn',
    component: Learn,
    // 为什么要这样设计:因为每一章节的学习内容都是从后端发过来的
    children: [
      {
        path: '',
        component: learnContent
      },
      {
        path: 'basic',
        component: learnContent
      },
      {
        path: 'junior',
        component: learnContent
      },
      {
        path: 'middle',
        component: learnContent
      },
      {
        path: 'senior',
        component: learnContent
      },
      {
        path: 'apply',
        component: learnContent
      },
      {
        path: 'fore',
        component: learnContent
      },
      {
        path: 'j2ee',
        component: learnContent
      },
      {
        path: 'frame',
        component: learnContent
      },
      {
        path: 'tool',
        component: learnContent
      },
      {
        path: 'database',
        component: learnContent
      }
    ]
  },
  {
    // *表示任意长度字符串,chapter组件用于学习页面,点开任意一学习栏目的正文时候
    path: '/chapter/*',
    component: Chapter
  },
  {
    path: '/learn/chapter/*',
    component: Chapter
  },
  {
    path: '/blog',
    component: Blog
  },
  {
    path: '/addArticle',
    component: AddArticle
  },
  {
    path: '/article/*',
    component: Article
  },
  {
    path: '/practice',
    component: Practice
  }
]

const router = new VueRouter({
  routes
})

export default router
