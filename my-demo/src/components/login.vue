<template>
  <div id="login">
    <div id="loginK">
      <h1>登录</h1>
      <div>
      <span>用户名:</span><Input v-model="loginName" icon="person" placeholder="请输入用户名" style="width: 200px"></Input>
      </div>
      <div>
      <span>密码:</span><Input v-model="password" icon="ios-locked" type="password" placeholder="请输入密码" style="width: 200px"></Input>
      </div>
      <div><Checkbox v-model="single">记住密码</Checkbox></div>

      <Button type="ghost" @click="login">登录</Button>

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
        loginName:'',
        password:'',
        single:false,
      }
    },
    methods: {
      login(){
          var that=this;
        this.$ajax.post('/api/login',{
          params:{
            loginName:this.loginName,
            password:this.password,
          }
        })
          .then(function(response){
            var token=response
            sessionStorage.setItem("token", response);
            that.$router.push('/home');
          })
          .catch(function(err){
            console.log(err);
          });
      }
      }


  }




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #login{
    height: 100%;
    width: 100%;
    position: relative;
    background: #FFF5E6;
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
