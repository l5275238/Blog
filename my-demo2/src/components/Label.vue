<template>
  <div id="Label">
    <div class="Label" v-for="item in classifyList" v-bind:style="{ opacity:0.5+item.zindex*0.005 , fontSize: 10+item.zindex*0.5 + 'px' }">{{item.text}}</div>


  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        classifyList:[],
        articleLenght:'',
      }

    },
    mounted(){
    this.getListLabel();
    },
    methods:{

      getListLabel(){
        var that=this;
        this.$ajax.get('/findFile',{
          params:{
            page:1,
            row:10
          }
        })
          .then(function(data){

            that.classifyList=data;
          })
          .catch(function(err){
//          console.log(err);
          });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #Label{
    min-height: 300px;
    background: #ffffff;
    padding: 20px;
    text-align: left;
  }
  .Label{
    display: inline-block;
    padding:5px 10px;
    text-decoration:underline
  }
</style>
