<template>
  <div id="app"  >
  <div class="container" >
    <div class="col-md-3">
      <div class="nav-title">
       {{name}}的博客
      </div>
      <ul class="list-group nav-list">
        <li class="list-group-item " @click="goto('/')"><img src="./assets/img/shouYe.png">首页</li>
        <li class="list-group-item"  @click="goto('Diary')"><img src="./assets/img/guiDang.png">归档</li>
        <li class="list-group-item"  @click="goto('Label')"><img src="./assets/img/biaoQian.png">标签</li>
        <li class="list-group-item" data-toggle="modal" data-target="#myModal"><img src="./assets/img/souSuo.png" >搜索</li>
      </ul>
      <div class="nav-content">
        <div class="nav-content-top">
        <img :src="this.imgUrl">
        <p>{{name}}</p>
        <p>{{content}}</p>
        </div>
        <div class="nav-content-middle">
          <div class="col-md-4">
            <p>{{articleLenght}}</p>
            <p @click="goto('Diary')">日记</p>
          </div>
          <div class="col-md-4">
            <p>{{CategoryLenght}}</p>
            <p  @click="goto('Classify')">分类</p>
          </div>
          <div class="col-md-4">
            <p>{{fileLength}}</p>
            <p  @click="goto('Label')">标签</p>
          </div>
        </div>
        <div class="nav-content-bottom">
          <img src="./assets/img/github.png">
          <a href="">GitHub</a>
          <img src="./assets/img/github.png">
          <a href="">站长之家</a>
        </div>

      </div>


    </div>
    <div class="col-md-9" id="right">
      <router-view></router-view>
    </div>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header" style="padding: 0;">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <input type="text" id="search" class="form-control" placeholder="搜索" style="border: none" v-model="search">
          </div>
          <div class="modal-body">
            <ul class="list-group">
              <li class="list-group-item" v-for="item in searchList" @click="gotoLook(item.id)" >{{item.title}}</li>
            </ul>
            <pagination class="paginationDiv" v-show="searchList.length>0" :total="total" :current-page='current' @pagechange="pagechange"></pagination>
          </div>
        </div>
      </div>
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
      articleLenght:'1',
      CategoryLenght:'',
      fileLength:'',
      total: 1,     // 记录总条数
      showPage: 10,   // 每页显示条数
      current: 1,   // 当前的页数
      row:1,
      searchList:[],
      search:"",
    }

  },
  mounted(){
    this.getUser();
    this.getAriticle();
    this.getCategory();
    this.getLable();
  },
  watch:{
    "search"(newValue, oldValue){
      this.getSearch(newValue);
      this.getData();

    },

  },
  methods:{
    gotoLook(id) {
        $('#myModal').modal('hide')
      this.$router.push({name:'lookAriticle',query:{id:id}})
    },
      getSearch(text){
        if(!text){
            this.searchList=[];
            return
        }
        var that=this;
        this.$ajax.post('/searchArticle', {
          params: {
            page: this.row,
            row: this.showPage,
            text: text,
          }})
          .then(function (data) {
            var obj = data.data;

            that.searchList = obj;
            console.log(that.searchList);
          })
            .catch(function (err) {
//          console.log(err);
            });
      },
    getUser(){
      var that=this;
      this.$ajax.get('/user',{
      })

        .then(function(data){
          var obj=data.data[0];

          that.content=obj.text;
          that.name=obj.name;
          that.imgUrl=that.url+obj.url;
        })
        .catch(function(err){
//          console.log(err);
        });

    },
    getAriticle(){
      var that=this;
      this.$ajax.get('/findArticleLenght',{})
        .then(function(data){
          var obj=data.data[0];
          console.log(obj);
          that.articleLenght=obj['count(1)'];
        })
        .catch(function(err){
//          console.log(err);
        });
    },
    getCategory(){
        var that=this;
      this.$ajax.get('/findCategoryLenght',{})
        .then(function(data){
          var obj=data.data[0];
          console.log(obj);
          that.CategoryLenght=obj['count(1)'];
        })
        .catch(function(err){
//          console.log(err);
        });
    },
    getLable(){
      var that=this
      this.$ajax.get('/findFileLength',{})
        .then(function(data){
          var obj=data.data[0];
          console.log(obj);
          that.fileLength=obj['count(1)'];
        })
        .catch(function(err){
//          console.log(err);
        });
    },
    goto(value){
      this.$router.push(value);
    },
    pagechange(val){
      this.row=val;
      getListAritic();
    },

  }
}


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
    cursor: pointer;
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
.paginationDiv{
  position: absolute;
  bottom: 0;
  left: 50%;
  transform:translateX(-50%) ;
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
  .nav-content-middle>div>p{
    cursor: pointer;
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
  .modal-header  .form-control{
    height: 50px;
  }
  .modal-header .close{
    position: absolute;
    right: 10px;
    top: 15px;
  }
  .modal-body{
    height: 500px;
  }
  .modal-body .list-group-item{
padding-left: 0;
  }

</style>
