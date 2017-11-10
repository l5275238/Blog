export default{
  install:function(Vue,options)
  {
    var obj=Vue.prototype;
    obj.getData = function () {
      console.log('我是插件中的方法');
    }
    obj.url='/api/';

  }
}/**
 * Created by T-Mac on 2017/9/27.
 */
