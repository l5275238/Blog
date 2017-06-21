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
      path: '/home',
      name: 'home',
      component: index,
      children: [
        { path: '/User', component: UserEdit, name: 'UserEdit', hidden: true },
        { path: '/Articl', component: Article, name: 'Article' },
        { path: '/AddArticle', component: ArticleAdd, name: 'ArticleAdd' },
        { path: '/Category', component: Category, name: 'Category' },
        { path: '/File', component: File, name: 'File' },
      ],
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      hidden: true
    },

    {
      path:'/',
      name:'',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: index,
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

