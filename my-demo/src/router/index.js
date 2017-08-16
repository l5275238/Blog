import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['../components/index.vue'], resolve),
      children: [
        // { path: '/', component: resolve => require(['../components/welcom.vue'], resolve), name: 'UserEdit', hidden: true },
        { path: '/User', component: resolve => require(['../components/UserEdit.vue'], resolve), name: 'UserEdit', hidden: true },
        { path: '/Articl', component: resolve => require(['../components/Article.vue'], resolve), name: 'Article' },
        { path: '/AddArticle', component: resolve => require(['../components/ArticleAdd.vue'], resolve), name: 'ArticleAdd' },
        { path: '/Category', component: resolve => require(['../components/Category.vue'],resolve), name: 'Category' },
        { path: '/File', component: resolve => require(['../components/File.vue'],resolve), name: 'File' },
        { path: '/LoginEdit', component: resolve => require(['../components/loginEdit.vue'],resolve), name: 'File' },
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
      component: resolve => require(['../components/index.vue'], resolve),
    },
    {
      path:'/login',
      name:'login',
      component:resolve => require(['../components/login.vue'], resolve)
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

