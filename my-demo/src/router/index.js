import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
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
    }
  ]
})
