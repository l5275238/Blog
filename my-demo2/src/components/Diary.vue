<template>
  <div id="Diary2">
      <div id ="Diary">
    <div class="DiaryList"><span class="yuan"></span> <span style="line-height: 40px">共计{{total}}日记，加油</span></div>

  <div class="DiaryList" v-for="item in articleList "><span class="yuan"></span><span class="title">{{item.title}}<span class="date">{{item.text}}<br>{{item.date}}</span></span><span class="shu"></span></div>
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
        articleLenght:'',
        total: 1,     // 记录总条数
        showPage: 10,   // 每页显示条数
        current: 1,   // 当前的页数
        row:1,
      }

    },
    mounted(){
      this.getListAritic();
      this.getAriticleLen();

    },
    computed:{

    },
    methods:{
      pagechange:function (val) {
       this.row=val;
        getListAritic();

      },
      getAriticleLen(){
        var that=this;
        this.$ajax.get('/findArticleLenght',{})
          .then(function(data){
            var obj=data.data[0];
            console.log(obj);
            that.total=obj['count(1)'];
            console.log(that.articleLenght);
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
            row:this.showPage
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
  #Diary{
    min-height: 100%;
    background: #ffffff;
    padding: 30px;
  }

  .yuan{
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #aaaaaa;
    position: absolute;
    left: 30px;
    bottom: 45px;
    z-index: 999;
  }
  .shu{
    position: absolute;
    width: 4px;
    height: 100%;
    bottom: 55px;
    left: 34px;
    background: #f5f7f9;
  }

  .DiaryList{
    position: relative;
    /*display: inline-block;*/
    text-align: left;
    padding: 30px;
  }

  .DiaryList>span:nth-child(2){
    padding-left: 30px;
    width: 100%;
    display: inline-block;
    text-align: left;
    height: 40px;
  line-height: 40px;
    position: relative;
    padding-right: 30px;
  }
  .date{
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 12px;
    line-height: 20px;
  }
  .title{
    color: #666;
    font-size: 16px;
  }

  *{
    padding: 0;
    margin: 0;
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
