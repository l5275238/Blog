export default{
  install(Vue,options)
  {
    Vue.prototype.getData = function () {
      console.log('我是插件中的方法');
    }
    Vue.prototype.url='/api/';
  }
}/**
 * Created by T-Mac on 2017/9/27.
 */
