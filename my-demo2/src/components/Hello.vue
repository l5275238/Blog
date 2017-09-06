<template>
<div id="heleo">
   <div class="wenZhang"  v-for="item in articleList">
     <h3 class="title">{{item.title}}</h3>
     <div class="fenLei">{{item.text}}</div>
     <div class="content" v-html="item.html">

     </div>
     <div class="time">{{item.date}}</div>
   </div>
</div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      articleList:[],
    }

  },
  created(){
    this.getListAritic();

  },
  methods:{
    getAriticleLen(){
      var that=this;
      this.$ajax.get('/findArticleLenght',{})
        .then(function(data){
          var obj=data.data[0];
          console.log(obj);
          that.articleLenght=obj['count(1)'];
        })
        .catch(function(err){
//          console.log(err);
        });
    },
    getListAritic(){
      var that=this;
      this.$ajax.get('/findArticle',{
        params:{
          page:1,
          row:10
        }
      })
        .then(function(data){
          var obj=data.data;

          console.log(obj);
          that.articleList=obj;
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
  *{
    padding: 0;
    margin: 0;
  }
#heleo{
  padding: 0;
  margin: 0;
}
.wenZhang{
  background: #ffffff;
  padding: 10px 20px;
  margin-bottom: 20px;
}
.wenZhang .content{
  background: #f5f7f9;
  text-align: left;

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
  .time{
    text-align: right;
  }
  .fenLei{
    text-align: right;
    padding: 10px 0;
  }
</style>
