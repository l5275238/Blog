<template>
<div id="heleo">
   <div class="wenZhang"  v-for="item in articleList" @click="gotoLook(item.id)">
     <h3 class="title">{{item.title}}</h3>
     <div class="fenLei">{{item.text}}</div>
     <div class="content" v-html="item.html">

     </div>
     <div class="time">{{item.date}}</div>
   </div>
  <pagination :total="total" :current-page='current' @pagechange="pagechange"></pagination>
</div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      articleList:[],
      total: 1,     // 记录总条数
      showPage: 10,   // 每页显示条数
      current: 1,   // 当前的页数
      row:1,
    }

  },
  mounted(){
    this.getListAritic();

  },
  methods:{
    gotoLook(id) {
      this.$router.push({name:'lookAriticle',query:{id:id}})
    },
    pagechange(page){
      this.row=page;
      this.getListAritic();
    },
    getAriticleLen(){
      var that=this;
      this.$ajax.get('/findArticleLenght',{})
        .then(function(data){
          var obj=data.data[0];
          console.log(obj);
          that.total=obj['count(1)'];
        })
        .catch(function(err){
//          console.log(err);
        });
    },
    getListAritic(){
      var that=this;
      this.$ajax.get('/findArticle',{
        params:{
          page:this.row,
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
  padding-top: 50px;
  background: rgba(255,255,255,1);
}
.wenZhang{

  padding: 10px 20px;
  /*margin-bottom: 20px;*/
  /*border-radius: 10px;*/
  cursor: pointer;
  box-sizing: content-box;
}
  /*.wenZhang:hover{*/
    /*border: #2aabd2 1px solid;*/
    /*box-sizing: content-box;*/

  /*}*/
.wenZhang .content{
  /*background: #f5f7f9;*/
  text-align: left;
  height: 300px;
  overflow: hidden;
  padding: 10px;
  text-indent:2em;
  border-radius: 10px;

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
    padding-top: 5px;
    text-align: right;
  }
  .fenLei{
    text-align: right;
    padding: 10px 0;
  }
</style>
