<template>
  <div id="Classify">

    <div class="ClassifyList"> <span style="line-height: 40px">共计{{articleLenght}}个分类，加油</span></div>

    <div class="ClassifyList" v-for="item in classifyList "><span class="title">{{item.text}}</span></div>


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
      this.getListAritic();
      this.getAriticleLen();

    },
    methods:{
      getAriticleLen(){
        var that=this;
        this.$ajax.get('/findFileLength',{})
          .then(function(data){
            var obj=data.data[0];
            console.log(obj);
            that.articleLenght=obj['count(1)'];
            console.log(that.articleLenght);
          })
          .catch(function(err){
//          console.log(err);
          });
      },
      getListAritic(){
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
  #Classify{
    min-height: 100%;
    background: #ffffff;
    padding: 30px;
  }

  .yuan{
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #aaaaaa;
    position: absolute;
    left: 30px;
    bottom: 45px;
    z-index: 999;
  }
  .shu{
    position: absolute;
    width: 4px;
    height: 100%;
    bottom: 55px;
    left: 34px;
    background: #f5f7f9;
  }

  .ClassifyList{
    position: relative;
    /*display: inline-block;*/
    text-align: left;
    padding: 30px;
  }

  .ClassifyList>span:nth-child(2){
    padding-left: 30px;
    width: 100%;
    display: inline-block;
    text-align: left;
    height: 40px;
    line-height: 40px;
    position: relative;
    padding-right: 30px;
  }
  .date{
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 12px;
    line-height: 20px;
  }
  .title{
    color: #666;
    font-size: 16px;
  }

  *{
    padding: 0;
    margin: 0;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

</style>
