<template>
  <div id="login">
    <div id="loginK">
      <h1>登录</h1>
      <div>
      <span>用户名:</span><Input v-model="value4" icon="person" placeholder="请输入用户名" style="width: 200px"></Input>
      </div>
      <div>
      <span>密码:</span><Input v-model="value4" icon="ios-locked" placeholder="请输入密码" style="width: 200px"></Input>
      </div>
      <div><Checkbox v-model="single">记住密码</Checkbox></div>

      <Button type="ghost">登录</Button>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        activeIndex: '1',
        activeIndex2: '1',
        value:'',
        img_file: {},
        value4:'',
        single:''
      }
    },
    methods: {}
  }




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #login{
    background: #fff5e6;
    height: 100%;
    width: 100%;
    position: relative;
  }
  #loginK{
    width: 400px;
    height: 300px;
    position: absolute;
    left:50%;
    top:50%;
    margin-left: -200px;
    margin-top: -200px;
    background: #ffffff;
    text-align: center;
    padding: 30px;
    border-radius: 30px;
  }
  #loginK>div{
    height: 40px;
    line-height: 40px;

  }
  #loginK>div>span{
    width: 50px;
    display: inline-block;
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
