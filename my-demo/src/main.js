// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview';
import axios from 'axios';
import 'iview/dist/styles/iview.css';
import App from './App'
import router from './router'
import store from './store'

Vue.use(iView)


Vue.prototype.$ajax = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {// 判断该路由是否需要登录权限
    if (store.state.getToken()){  // 通过vuex state获取当前的token是否存在
      console.log(store.state.getToken());
      next();
    }
    else {
      console.log(store.state.getToken());
      next({
        path: '/login',
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {

    next();
  }
})
axios.interceptors.request.use(function (config) {
  if (store.state.getToken()) {// 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = store.state.getToken();
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  // console.log(response);

  switch (response.data.code) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        router.replace({
          path: 'login',
        })
    }

  return response;
}, function (error) {

  return Promise.reject(error);
});;


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

