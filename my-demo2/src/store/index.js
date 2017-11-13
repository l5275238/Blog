/**
 * Created by T-Mac on 2017/6/21.
 */
import vue from 'vue';
import vuex from 'vuex';
vue.use(vuex);
const store=new vuex.Store({
  state:{
   name:'你好',

  },
  mutations:{
    setName(state,n){

        state.name=n;

    }
  },
  actions: {
    setName ({ commit },n) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('setName',n);
          resolve()
        }, 1000)
      })
    }
  },

  getters:{
    getName:function (state) {
      return state.name
    }
  }

})
export default store;


