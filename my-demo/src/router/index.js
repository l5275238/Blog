import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Article from '@/components/Article'
import ArticleAdd from '@/components/ArticleAdd'
import Category from '@/components/Category'
import UserEdit from '@/components/UserEdit'
import File from '@/components/File'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path:'/User',
      name:'UserEdit',
      component:UserEdit
    },
    {
      path:'/Articl',
      name:'Article',
      component:Article
    },
    {
      path:'/AddArticle',
      name:'ArticleAdd',
      component:ArticleAdd
    }
    ,
    {
      path:'/Category',
      name:'Category',
      component:Category
    }
      ,
    {
      path:'/File',
      name:'File',
      component:File
    }
  ]
})
