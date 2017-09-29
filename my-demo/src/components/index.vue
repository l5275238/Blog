<template>

  <div id="app" style="overflow: hidden">
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
      <Row type="flex">
        <Col :span="spanLeft" class="layout-menu-left">
        <Menu active-name="1" theme="dark" width="auto" @on-select="routeTo">
          <div class="layout-logo-left"></div>
          <!--<MenuItem  v-for="item in itmes"  name="item.name">-->
            <!--<Icon type="ios-navigate" :size="iconSize"></Icon>-->
            <!--<span class="layout-text">{{item.name}}</span>-->
          <!--</MenuItem>-->
          <MenuItem name="/User" title="发布文章" >
            <Icon type="ios-keypad" :size="iconSize"></Icon>
            <span class="layout-text">个人信息</span>
          </MenuItem>
          <MenuItem name="/File" title="发布文章">
            <Icon type="ios-analytics" :size="iconSize"></Icon>
            <span class="layout-text">个人标签</span>
          </MenuItem>
          <MenuItem name="/Category" title="发布文章">
            <Icon type="ios-keypad" :size="iconSize"></Icon>
            <span class="layout-text">文章分类</span>
          </MenuItem>
          <MenuItem name="/Articl" title="发布文章">
            <Icon type="ios-analytics" :size="iconSize"></Icon>
            <span class="layout-text">发布文章</span>
          </MenuItem>
        </Menu>
        </Col>
        <Col :span="spanRight">
        <div class="layout-header">
          <Button type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div>

        <div class="layout-content">
          <div class="layout-content-main">  <transition
            name="bounce"
          >
            <router-view></router-view>
          </transition></div>
        </div>
        <div class="layout-copy">
          2011-2016 &copy; TalkingData
        </div>
        </Col>
      </Row>
    </div>
    <canvas id="canvas">

    </canvas>

    <!--<div id="ivew">-->
      <!--<div class="ivew" v-for="itme in itmes" @click="routeTo(itme.url)">{{itme.name}}</div>-->

    <!--</div>-->

    <!--<div id="view">-->
      <!--<transition-->
        <!--name="bounce"-->
      <!--&gt;-->
        <!--<router-view></router-view>-->
      <!--</transition>-->
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
        text: '',
        showName:'首页',
        itmes: [
          {name: '个人信息', url: '/User'},
          {name: '个人标签', url: '/File'},
          {name: '文章分类', url: '/Category'},
          {name: '发布文章', url: '/Articl'}
        ],



      }
    },
    computed: {
      iconSize (){
        return this.spanLeft === 5 ? 14 : 24;
      },

    },
    methods: {
      routeTo (name){
        this.$router.push(name);
        this.text = name;
        this.showName=name;
      },
      toggleClick () {
        if (this.spanLeft === 5) {
          this.spanLeft = 2;
          this.spanRight = 22;
        } else {
          this.spanLeft = 5;
          this.spanRight = 19;
        }
      }
    },
    mounted(){
      var canvas = document.getElementById('canvas');
      var width = canvas.offsetWidth;
      var height = canvas.offsetHeight;
      var ctx = canvas.getContext('2d')
      canvas.width = width;
      canvas.height = height;
      var pannel = new Panel(width, height, ctx,'#fff','#e9eaec');

      //画布和线
      function Panel(width, height, ctx,color1,color2) {
        //速度X轴
        var speedX = 1;
        //Y轴
        var speedY = 1;
        //小球数量
        var num = 100;
        //线条半径
        var r = 200;
        var color1=color1?color1:'#ccc'
        var color2=color2?color2:'#000'
        //小球的数组
        this.round = [];
        this.width = width;
        this.height = height;
        var lineX = width / 2;
        var lineY = height / 2;

        this.setLineX = function (x, y) {
          speedX = x > lineX ? speedX : -speedX;
          speedY = y > lineY ? speedY : -speedY;


        }
        //移动线条的位置
        this.move = function () {
          if (lineX < 0 || lineX > this.width - 200) {
            speedX = -speedX
          }
          else if (lineY < 0 || lineY > this.height - 200) {
            speedY = -speedY
          }
          lineX += speedX
          lineY += speedY
        }
        //画线条
        this.DrawLine = function () {
          var len = this.round.length;
          for (var i = 0; i < len; i++) {
            for (var j = 0; j < len; j++) {
              var rv1 = this.round[i];
              var rv2 = this.round[j];
              if ((rv1.x - rv2.x) < r && (rv1.y - rv2.y) < r && (rv1.x - rv2.x) > -r && (rv1.y - rv2.y) > -r) {

                  ctx.beginPath();
                  ctx.strokeStyle = 'rgba(234,236,237,0.1)';
                  ctx.moveTo(rv1.x, rv1.y);
                  ctx.lineTo(rv2.x, rv2.y);
                  ctx.stroke();
                  ctx.closePath();

              }
            }
          }
        }
        //初始化画布
        this.Initialization = function () {
          ctx.clearRect(0, 0, this, width, this.height);
          ctx.fillRect(0, 0, this, width, this.height);
          ctx.beginPath();

          var lingrad = ctx.createLinearGradient(0, -this.width, 0, this.height);
          lingrad.addColorStop(0,color1);
          lingrad.addColorStop(1, color2);
          ctx.fillStyle = lingrad;
          ctx.fillRect(0, 0, this.width, this.height);
        }
        //第一次画 将小球存放
        this.draw = function () {
          this.Initialization();
          for (var j = 1; j < num; j++) {
            ctx.save();
            var x = this.width - Math.floor(Math.random() * this.width);
            var y = this.height - Math.floor(Math.random() * this.height)
            var isFu = (j % 2 == 0) ? true : false;
            var spot = new Circle(x, y, ctx, isFu);

            this.round.push(spot)
            spot.draw(ctx);
            ctx.restore();
          }
        }
        //循环画小球
        this.loopDraw = function () {
          var len = this.round.length;
          for (var i = 0; i < len; i++) {
            var arr = this.round[i];
            arr.step();
            arr.draw();
          }
        }
      }

      //随机颜色
      function color(minNum) {
        var min = minNum ? minNum : 0;
        var g = Math.floor(225 * Math.random() + min);
        var b = Math.floor(225 * Math.random() + min);
        var a = Math.floor(225 * Math.random() + min);
        var aplin = 1 * Math.random()*0.5;
        return 'rgba(' + g + ',' + b + ',' + a + ',' + aplin + ')'
      }

      //小点
      function Circle(x, y, ctx, isFu) {
        this.x = x;
        this.y = y;
        this.r = 10* Math.random()+5;
        this.aplin = 0.8;
        var speedX = isFu ? 1 * 1 * Math.random() : -1 * 1 * Math.random();
        var speedY = isFu ? 1 * 1 * Math.random() : -1 * 1 * Math.random();
        this.color = color(255);

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
          if (this.y < 0 || this.y > height) {
            speedY = -speedY
          }
          else if (this.x < 0 || this.x > width) {
            speedX = -speedX
          }
          this.x += speedX
          this.y += speedY
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

      var body = document.querySelector('body')
      body.onmousemove = function (e) {
        pannel.setLineX(e.clientX, e.clientY)
      }
      requestAnimationFrame(go);
    }
  }
</script>

<style>
  #app {
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
  }

  .layout-breadcrumb {
    padding: 10px 15px 0;
  }

  .layout-content {
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }

  .layout-content-main {
    padding: 10px;
  }

  .layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }

  .layout-menu-left {
    background: #464c5b;
  }

  .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }

  .layout-ceiling-main a {
    color: #9ba7b5;
  }

  .layout-hide-text .layout-text {
    display: none;
  }

  .ivu-col {
    transition: width .2s ease-in-out;
  }

  .ivu-row-flex {
    height: 100%;
  }

  #canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    /*z-index: 99999;*/
  }

  #ivew {
    position: absolute;
    /*width: 100%;*/
    width: 200px;
    text-align: center;
    top: 40%;
    left: 0;
    transform: translateY(-50%);
    /*height: 100%;*/
    z-index: 9999;
  }

  .ivew {
    width: 120px;
    height: 120px;
    /*border-radius: 50%;*/
    /*color: #ffffff;*/
    text-align: center;
    /*border: 1px solid #ffffff;*/
    line-height: 120px;
    margin: 50px;
    font-size: 20px;
    cursor: pointer;
  }

  .ivew:hover {
    transform: translateX(10px);
    /*width: 140px;*/
    /*height: 140px;*/
    line-height: 140px;
    font-size: 25px;
    transition: all 0.5s;
    /*border: 1px solid #ffffff;*/
  }

  #view {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    padding-left: 200px;
    vertical-align: middle;
    padding-top: 200px;
    color: #ffffff;
    padding-top: 100px;
    /*background: #ffffff;*/
    /*display: flex;*/
    /*justify-content:center;*/
    /*align-items:center;*/
  }

  /*.ivu-table {*/
    /*background: none;*/
    /*color: #ffffff;*/
    /*border: none;*/
    /*font-size: 20px;*/
  /*}*/

  /*.ivu-table-wrapper {*/
    /*border: none;*/
  /*}*/

  /*!*.ivu-table th {*!*/
    /*!*color: #ffffff;*!*/
    /*!*background: transparent !important;*!*/
    /*!*border: none;*!*/
  /*!*}*!*/

  /*.ivu-table td {*/
    /*background: none;*/
  /*}*/

  /*.ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {*/
    /*background: none;*/
  /*}*/

  /*.ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td:hover {*/
    /*background: none;*/
  /*}*/

  /*.ivu-table td, .ivu-table th {*/
    /*border: none;*/
  /*}*/

  /*tr.ivu-table-row-hover td {*/
    /*background: none;*/
  /*}*/

  /*.ivu-table:after {*/
    /*display: none;*/
  /*}*/

  /*.ivu-table:before {*/
    /*display: none;*/
  /*}*/

  /*.th .ivu-table-cell {*/
    /*font-size: 20px;*/
  /*}*/

  /*.bounce-enter{*/
  /*opacity: 0;*/
  /*transform:  translateX( 3000px );*/
  /*}*/
  .bounce-enter-active {
    transition: all .5s
  }

  .bounce-enter, .bounce-leave-active {
    opacity: 0;
    transform: scale(0.5) rotateY(100deg);
    /*animation: bounce-in .5s reverse;*/
  }


</style>
