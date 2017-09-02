<template>
  <div id="app" >
  <div class="container">
    <div class="col-md-3">
      <div class="nav-title">
       {{name}}的博客
      </div>
      <ul class="list-group nav-list">
        <li class="list-group-item "><img src="./assets/img/shouYe.png">首页</li>
        <li class="list-group-item"><img src="./assets/img/guiDang.png">归档</li>
        <li class="list-group-item"><img src="./assets/img/biaoQian.png">标签</li>
        <li class="list-group-item"><img src="./assets/img/souSuo.png">搜索</li>
      </ul>
      <div class="nav-content">
        <div class="nav-content-top">
        <img src="./assets/logo.png">
        <p>{{name}}</p>
        <p>{{content}}</p>
        </div>
        <div class="nav-content-middle">
          <div class="col-md-4">
            <p>11</p>
            <p>日记</p>
          </div>
          <div class="col-md-4">
            <p>6</p>
            <p>分类</p>
          </div>
          <div class="col-md-4">
            <p>111</p>
            <p>标签</p>
          </div>
        </div>
        <div class="nav-content-bottom">
          <img src="./assets/img/github.png">
          <a href="">GitHub</a>
        </div>
      </div>


    </div>
    <div class="col-md-9" id="right">
      <router-view></router-view>
    </div>

  </div>

  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
        name:'1',
        imgUrl:'1',
        content:'1',
    }

  },
  created(){
    this.getUser();
    this.getAriticle();
  },
  methods:{
    getUser(){
      var that=this;
      this.$ajax.get('/api/user',{
      })

        .then(function(data){
          var obj=data.data[0];

          that.content=obj.text;
          that.name=obj.name;
          that.imgUrl=obj.url;
        })
        .catch(function(err){
//          console.log(err);
        });

    },
    getAriticle(){
      this.$ajax.get('/api/findArticleLenght',{})
        .then(function(data){
          var obj=data.data[0];

          that.articleLenght=obj.text;
          that.name=obj.name;
          that.imgUrl=obj.url;
        })
        .catch(function(err){
//          console.log(err);
        });
    }

  }
}

var a=function () {
  this.name=1
}
a.prototype={
    getName:function () {
//      console.log(this);
    }
}
var b=new a()

  b.getName();

</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f5f7f9;
  min-height: 100%;
  position: absolute;
  width: 100%;
}

  .nav-title{
    background: #000000;
    color: #ffffff;
    height: 150px;
    line-height: 150px;
    font-size: 20px;
    font-weight: bold;
  }
  .nav-list{
    padding: 20px 0;
    background: #ffffff;
  }

  .list-group-item{
    border: none;
    position: relative;
    text-align: left;
    padding-left: 60px;
  }
  .list-group-item>img{
  position: absolute;
  left: 30px;
  top:12px
}
.nav-content{
  background: #ffffff;
  padding: 20px;
}
  .nav-content-top>img{
    width: 150px;
  }
  .nav-content-top>p:nth-child(1){
  font-weight: bold;
  font-size: 20px;

}
.nav-content-top>p:nth-child(2){
  font-weight: bold;
  font-size: 20px;

}
  .nav-content-middle{
    overflow: hidden;
  }
  .nav-content-middle div:nth-child(1){
       border-right: 2px solid #cccccc;
     }
.nav-content-middle div:nth-child(2){
  border-right: 2px solid #cccccc;
}
  .nav-content-bottom{
    padding: 10px ;
  }
</style>
