<template>
  <div id="Ariticle">
      <div class="title">{{title}}</div>
    <div class="bottom">{{date}}</div>
    <div class="bottom">{{text}}</div>
      <div class="content" v-html="html"></div>

  </div>
</template>
<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        title:[],
        text:'',
        date:'',
        html:'',
      }

    },
    mounted(){
      this.getAriticle();

    },
    methods: {

      getAriticle(){
        var that = this;
        this.$ajax.post('/findText', { params:{
          id:this.$route.query.id
        }})
          .then(function (data) {
              var data=data.data[0]
              that.title=data.title
              that.text=data.text
              that.date=data.date
              that.html=data.html
          })
          .catch(function (err) {
//          console.log(err);
          });
      }
    }
  }
</script>



<style>
  #Ariticle{
    background: #ffffff;
    padding: 30px;
  }
  .title{
    font-size: 25px;
    font-weight: bold;
  }
  #Ariticle .content{
    min-height: 300px;
    text-align: left;
  }
  .bottom{
    text-align: right;
  }
</style>
