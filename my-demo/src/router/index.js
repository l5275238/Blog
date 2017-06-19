import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import index from '@/components/index'
import Article from '@/components/Article'
import ArticleAdd from '@/components/ArticleAdd'
import Category from '@/components/Category'
import UserEdit from '@/components/UserEdit'
import File from '@/components/File'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: index,
      children: [
        { path: '/User', component: UserEdit, name: 'UserEdit', hidden: true },
        { path: '/Articl', component: Article, name: 'Article' },
        { path: '/AddArticle', component: ArticleAdd, name: 'ArticleAdd' },
        { path: '/Category', component: Category, name: 'Category' },
        { path: '/File', component: File, name: 'File' },
      ],
      hidden: true
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    // {
    //   path:'/Articl',
    //   name:'Article',
    //   component:Article
    // },
    // {
    //   path:'/AddArticle',
    //   name:'ArticleAdd',
    //   component:ArticleAdd
    // }
    // ,
    // {
    //   path:'/Category',
    //   name:'Category',
    //   component:Category
    // }
    //   ,
    // {
    //   path:'/File',
    //   name:'File',
    //   component:File
    // }
  ]
})
