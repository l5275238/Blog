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
    },
    Panlel(){
      //画布和线
        //速度X轴
        var speedX = 1;
        //Y轴
        var speedY = 1;
        //小球数量
        var num = 300;
        //线条半径
        var r = 100;
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
                if ((rv1.x - lineX) < r && (rv1.y - lineY < r && (rv1.x - lineX) > -r && (rv1.y - lineY) > -r)) {
                  ctx.beginPath();
                  ctx.strokeStyle = color(100);
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
        this.Initialization = function () {
          ctx.clearRect(0, 0, this, width, this.height);
          ctx.fillRect(0, 0, this, width, this.height);
          ctx.beginPath();
          var lingrad = ctx.createLinearGradient(0, -this.width, 0, this.height);
          lingrad.addColorStop(0, '#ccc');
          lingrad.addColorStop(1, '#000');
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
        //画球
      function Circle(x, y, ctx, isFu) {
        this.x = x;
        this.y = y;
        this.r = 3 * Math.random();
        this.aplin = 0.8;
        var speedX = isFu ? 1 * 1 * Math.random() : -1 * 1 * Math.random();
        var speedY = isFu ? 1 * 1 * Math.random() : -1 * 1 * Math.random();
        this.color = color(50);

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
      }

  }

})
export default store;


