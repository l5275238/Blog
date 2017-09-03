// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import

  Vue from 'vue'
import App from './App'
import axios from 'axios';
import router from './router'
import $ from 'jquery'
import 'bootstrap/js/bootstrap.min.js'
import 'bootstrap/css/bootstrap.min.css'

Vue.config.productionTip = false
Vue.prototype.$ajax = axios

axios.interceptors.request.use(function (config) {
  config.url='/api'+config.url;
  // if (store.state.getToken()) {// 判断是否存在token，如果存在的话，则每个http header都加上token
  //   config.headers.Authorization = store.state.getToken();
  // }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {

  return Promise.reject(error);
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

