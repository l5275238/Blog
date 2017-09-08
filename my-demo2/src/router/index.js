import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Diary from '@/components/Diary'
import Classify from '@/components/Classify'
import Label from '@/components/Label'
import lookAriticle from '@/components/lookAriticle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path:'/Diary',
      name: 'Diary',
      component: Diary
    },
    {
      path:'/Classify',
      name: 'Classify',
      component: Classify
    },
    {
      path:'/Label',
      name: 'Label',
      component: Label
    },
    {
      path:'/lookAriticle',
      name: 'lookAriticle',
      component: lookAriticle
    },
  ]
})
