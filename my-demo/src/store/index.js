/**
 * Created by T-Mac on 2017/6/21.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store=new Vuex.Store({
  state:{
    getToken(){
      return sessionStorage.getItem('token');
    }

  }

})
export default store;


