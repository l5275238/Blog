<template>
<div class="Addarticle" id="Addarticle">
  <h2>标题</h2>
  <Input v-model="title" type="textarea" style="background: none" :autosize="{minRows: 2}" placeholder="请输入..."></Input>
  <h2>选择分类</h2>
  <Select v-model="category" style="width:200px">
    <Option v-for="item in categoryList" :value="item.id">{{ item.text }}</Option>
  </Select>
  <div id="editor">
  <!--<mavon-editor  v-model="content"   @save="submit" @imgAdd="imgAdd"/></mavon-editor>-->
    <vue-editor v-model="content"></vue-editor>
  </div>
</div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
//  import { mavonEditor } from 'mavon-editor'
//  import 'mavon-editor/dist/css/index.css'

  export default {
    name: 'Addarticle',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        activeIndex: '1',
        activeIndex2: '1',
        title:'',
        category:'',
        categoryList:'',
        modal6: false,
        fenLei:'',
        content:'',

      }
    },
    components: {
      VueEditor
      // or 'mavon-editor': mavonEditor
    },
    created(){
//      console.log(VueQuillEditor);
      this.fetData();
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      addFenLei(){
        var that=this;
        this.$ajax.get('/addcategory',{
          params:{
            text:this.fenLei,
          }
        })
          .then(function(response){
            that.fetData();
            that.modal6=false
          })
          .catch(function(err){
            console.log(err);
          });
      },
      fetData(){
        var that=this;
        if( that.$route.query.id){
          this.$ajax.post('/findText',{
            params:{
              id:this.$route.query.id
            }

          })
            .then(function(response){
              var data=response.data[0];
              that.content=data.text;
              that.title=data.title;
              that.category=data.cateId;
              console.log(data.text);
            })
            .catch(function(err){
              console.log(err);
            });
        }

        this.$ajax.post('/findCategory',{

        })
          .then(function(response){
            console.log(response.data);
            that.categoryList=response.data;

          })
          .catch(function(err){
            console.log(err);
          });

      },
      imgAdd(fileName,file){
        console.log(file);
        var that=this;
        var oMyForm = new FormData();
        oMyForm.append("img", file);

        this.$ajax({
          url: '/profile',
          method: 'post',
          data: oMyForm,
          headers: { 'Content-Type': 'multipart/form-data' },
        })
          .then(function(response){
            console.log(response);
            that.content+=('![图片](/static/'+response.filename+')')

          })
          .catch(function(err){
            console.log(err);
          });

      },
      submit(value ,reder){
          if(this.$route.query.id){
            this.$ajax.post('/updateArticle',{
              params:{
                title:this.title,
                cateId:this.category,
                text:this.content,
                id:this.$route.query.id,
                html:reder
              }
            })
              .then(function(response){
                console.log(response.data);
//            that.categoryList=response.data;
              })
              .catch(function(err){
                console.log(err);
              });
          }
          else {
            this.$ajax.post('/addArticle',{
              params:{
                title:this.title,
                cateId:this.category,
                text:this.content,
                html:reder
              }
            })
              .then(function(response){
                console.log(response.data);
//            that.categoryList=response.data;
              })
              .catch(function(err){
                console.log(err);
              });
          }

      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
#editor{
  overflow: hidden;
}
.v-note-wrapper{
  z-index: 1;
}
  #upload{
    position: fixed;
    right: 20px;
    bottom: 200px;
    z-index: 1999;
  }
  h2{
    text-align: center;
     height: 40px;
    line-height: 40px;

  }

</style>
