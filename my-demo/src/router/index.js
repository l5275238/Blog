import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import article from '@/components/article'
import articleAdd from '@/components/articleAdd'
import demo from '@/components/demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path:'/app',
      name:'demo',
      component:demo
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

  ]
})
