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
    <div id="view"><router-view></router-view></div></div>
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
    var canvas = document.getElementById('canvas');
    var width = canvas.offsetWidth;
    var height = canvas.offsetHeight;
    var ctx = canvas.getContext('2d')
    canvas.width = width;
    canvas.height = height;
    var pannel=new Panel(width,height,ctx);

    //画布和线
    function Panel(width,height,ctx) {
      //速度X轴
      var speedX=1;
      //Y轴
      var speedY=1;
      //小球数量
      var num=300;
      线条半径
      var r=100;
      //小球的数组
      this.round=[];
      this.width=width;
      this.height=height;
      var lineX=width/2;
      var lineY=height/2;
      //移动线条的位置
      this.move=function () {
        if(lineX<0||lineX>this.width-200){
          speedX=-speedX
        }
        else if(lineY<0||lineY>this.height-200){
          speedY=-speedY
        }
        lineX+=speedX
        lineY+=speedY
      }
      //画线条
      this.DrawLine= function () {
        var len=this.round.length;
        for(var i = 0; i < len; i++){
          for(var j = 0; j < len; j++){
            var rv1=this.round[i];
            var rv2=this.round[j];
            if((rv1.x - rv2.x) <r && (rv1.y - rv2.y) < r && (rv1.x - rv2.x) > -r && (rv1.y - rv2.y) > - r){
              if((rv1.x - lineX) < r && (rv1.y - lineY <  r && (rv1.x - lineX) > -  r && (rv1.y - lineY) > - r)){
                ctx.beginPath();
                ctx.strokeStyle = color();
                ctx.moveTo(rv1.x, rv1.y);
                ctx.lineTo(rv2.x, rv2.y);
                ctx.stroke();
                ctx.closePath();
              }
            }
          }
        }
      }
      //初始化画布
      this.Initialization=function () {
        ctx.clearRect(0, 0, this,width, this.height);
        ctx.fillRect(0, 0, this,width, this.height);
        ctx.beginPath();
        var lingrad = ctx.createLinearGradient(0, -this.width, 0, this.height);
        lingrad.addColorStop(0, '#000');
        lingrad.addColorStop(1, '#002');
        ctx.fillStyle = lingrad;
        ctx.fillRect(0, 0, this.width, this.height);
      }
      //第一次画 将小球存放
      this.draw=  function () {
        this.Initialization();
        for (var j = 1; j < num; j++) {
          ctx.save();
          var  x = this.width - Math.floor(Math.random() * this.width);
          var  y = this.height - Math.floor(Math.random() * this.height)
          var isFu=(j%2 == 0)?true:false;
          var spot = new Circle(x, y, ctx,isFu);

          this.round.push(spot)
          spot.draw(ctx);
          ctx.restore();
        }
      }
      //循环画小球
      this.loopDraw=function () {
        var len = this.round.length;
        for (var i = 0; i < len; i++) {
          var arr = this.round[i];
          arr.step();
          arr.draw();
        }
      }
    }
    //随机颜色
    function color() {
      var g =  Math.floor(225 * Math.random());
      var b =  Math.floor(225 * Math.random());
      var a =  Math.floor(225 * Math.random());
      var aplin = 1 * Math.random();
      return 'rgba(' + g + ',' + b + ',' + a + ',' + aplin + ')'
    }
    //小点
    function Circle(x, y, ctx,isFu) {
      this.x = x;
      this.y = y;
      this.r = 3 * Math.random();
      this.aplin = 0.8;
      var  speedX =isFu? 1 * 1 * Math.random():-1 * 1 * Math.random();
      var  speedY =isFu? 1 * 1 * Math.random():-1 * 1 * Math.random();
      this.color = color();

      this.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.arc(0, 0, this.r, 0, Math.PI * 2, true)
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      this.step = function () {
        if (this.y <0||this.y>height) {
          speedY=-speedY
        }
        else if(this.x <0||this.x>width){
          speedX=-speedX
        }
        this.x+=speedX
        this.y+=speedY
      }
    }
    pannel.draw();
    function go() {
      pannel.Initialization()
      pannel.move();
      pannel.DrawLine();
      pannel.loopDraw()

      requestAnimationFrame(go);
    }
    requestAnimationFrame(go);
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
    /*width: 100%;*/
    width: 200px;
    text-align: center;
    top:40%;
    left: 0;
    transform: translateY(-50%);
    /*height: 100%;*/
    z-index: 9999;
  }
  .ivew{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #ffffff;
    text-align: center;
    line-height: 100px;
    margin:50px;
    font-size: 14px;
  }
  .ivew:hover{
    transform: translateX(10px);
    width: 120px;
    height: 120px;
    line-height: 120px;
    font-size:20px ;
    transition: all 0.5s;
  }
  #view{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    padding-left: 200px;
  }
</style>
