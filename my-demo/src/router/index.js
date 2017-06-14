import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import article from '@/components/article'
import articleAdd from '@/components/articleAdd'
import articleEdit from '@/components/articleEdit'
import userEdit from '@/components/userEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path:'/user',
      name:'userEdit',
      component:userEdit
    },
    {
      path:'/articl',
      name:'article',
      component:article
    },
    {
      path:'/addArticle',
      name:'articleAdd',
      component:articleAdd
    }
    ,
    {
      path:'/editArticle/:id',
      name:'articleEdit',
      component:articleEdit
    }

  ]
})
