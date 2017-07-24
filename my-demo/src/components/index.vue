<template>
  <div id="app">
    <canvas  id="canvas">

    </canvas>
    <div id="ivew">
        <div class="ivew">个人信息</div>
        <div class="ivew">标签</div>
        <div class="ivew">文章分类</div>
        <div class="ivew">文章管理</div>
    </div>
    <!--<div class="layout" :class="{'layout-hide-text': spanLeft < 5}">-->
      <!--<Row type="flex">-->
        <!--<i-col :span="spanLeft" class="layout-menu-left">-->
          <!--<Menu active-name="1" theme="dark" width="auto" @on-select="routeTo">-->
            <!--<div class="layout-logo-left"></div>-->
            <!--<Menu-item name="/User"  >-->
              <!--<Icon type="ios-navigate" :size="iconSize"></Icon>-->
              <!--<span class="layout-text">个人信息</span>-->
            <!--</Menu-item>-->
            <!--<Menu-item name="/File">-->
              <!--<Icon type="ios-keypad" :size="iconSize"></Icon>-->
              <!--<span class="layout-text">归档</span>-->
            <!--</Menu-item>-->
            <!--<Menu-item name="/Category">-->
              <!--<Icon type="ios-analytics" :size="iconSize"></Icon>-->
              <!--<span class="layout-text">文章分类</span>-->
            <!--</Menu-item>-->
            <!--<Menu-item name="/Articl">-->
              <!--<Icon type="ios-analytics" :size="iconSize"></Icon>-->
              <!--<span class="layout-text">发布文章</span>-->
            <!--</Menu-item>-->

          <!--</Menu>-->
        <!--</i-col>-->
        <!--<i-col :span="spanRight">-->
          <!--<div class="layout-header">-->
            <!--<i-button type="text" @click="toggleClick">-->
              <!--<Icon type="navicon" size="32"></Icon>-->
            <!--</i-button>-->
          <!--</div>-->
          <!--<div class="layout-breadcrumb">-->
            <!--<Breadcrumb>-->
              <!--<Breadcrumb-item href="#">首页</Breadcrumb-item>-->
              <!--<Breadcrumb-item href="#"></Breadcrumb-item>-->
            <!--</Breadcrumb>-->
          <!--</div>-->
          <!--<div class="layout-content">-->
            <!--<div class="layout-content-main">  <router-view></router-view></div>-->
          <!--</div>-->
          <!--<div class="layout-copy">-->
            <!--2011-2016 &copy; TalkingData-->
          <!--</div>-->
        <!--</i-col>-->
      <!--</Row>-->
    <!--</div>-->




  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      spanLeft: 5,
      spanRight: 19,
      text:''
    }
  },
  computed: {
    iconSize () {
      return this.spanLeft === 5 ? 14 : 24;
    }
  },
  methods: {
    toggleClick () {
      if (this.spanLeft === 5) {
        this.spanLeft = 2;
        this.spanRight = 22;
      } else {
        this.spanLeft = 5;
        this.spanRight = 19;
      }
    },
    routeTo (name){
      this.$router.push(name);
      this.text=name;
    }
  },
  mounted(){
    var yuanArr=[];
    var canvas = document.getElementById('canvas');
    var width = canvas.offsetWidth;
    var height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    var ctx=canvas.getContext('2d')
    function draw() {
      ctx.fillRect(0,0,width,height);
      ctx.beginPath();
      var lingrad = ctx.createLinearGradient(0,-width,0,height);
      lingrad.addColorStop(0, '#b7cbc4');
      lingrad.addColorStop(1, '#dbc590');
      ctx.fillStyle = lingrad;
      ctx.fillRect(0,0,width,height);
      var x=1000;
      var y=1000;
      for (var j=1;j<100;j++){
        ctx.save();
        x=width-Math.floor(Math.random()*width);
        y=height-Math.floor(Math.random()*height)
        var yuan=new Circle(x,y,ctx);
        yuanArr.push(yuan);
        yuan.draw(ctx);
//            drawStar(ctx,0)
        ctx.restore();
      }
    }
    draw();
    function Circle(x,y,content) {
      this.x=x;
      this.y=y;
      this.r=5*Math.random();
      this.aplin=0.8;
      this.speed=1*1*Math.random()
      this.draw=function () {
//            content.strokeStyle='#fff';
        this.aplin=this.y/height;
        ctx.beginPath();
        content.fillStyle='rgba(225,225,225,'+this.aplin+')';
        content.save();
        content.translate(this.x, this.y);
//            content.fillStyle='red';
//            content.beginPath();
        content.arc(0,0,this.r,0,Math.PI*2,true)
        content.closePath();
        content.fill();
        content.restore();
      }
      this.step=function () {
        this.y=this.y-this.speed;
        if(this.y<-this.r){
          this.y=this.r+1000;

        }
      }

    }
    function go() {
      ctx.clearRect(0,0,width,height);
      ctx.fillRect(0,0,width,height);
      ctx.beginPath();
      var lingrad = ctx.createLinearGradient(0,-width,0,height);
      lingrad.addColorStop(0, '#b7cbc4');
      lingrad.addColorStop(1, '#dbc590');
      ctx.fillStyle = lingrad;
      ctx.fillRect(0,0,width,height);
      var len=yuanArr.length;
      for(var i=0;i<len;i++){
        var arr=yuanArr[i];
        arr.step();
        arr.draw();
      }
    }
    setInterval(go,10);
  }
}
</script>

<style>
  #app{
    height: 100%;
    position: absolute;
    width: 100%;
  }
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #464c5b;
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .layout-ceiling-main a{
    color: #9ba7b5;
  }
  .layout-hide-text .layout-text{
    display: none;
  }
  .ivu-col{
    transition: width .2s ease-in-out;
  }
  .ivu-row-flex{
    height: 100%;
  }
  #canvas{
    position: absolute;
    width: 100%;
    height: 100%;
    /*z-index: 99999;*/
  }
  #ivew{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .ivew{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #ffffff;
    text-align: center;
    line-height: 100px;
    margin: 10px;
    font-size: 14px;
  }
</style>
