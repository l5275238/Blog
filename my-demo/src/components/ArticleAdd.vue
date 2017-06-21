<template>
<div class="Addarticle">
  <h2>标题</h2>
  <Input v-model="title" type="textarea" :autosize="{minRows: 2}" placeholder="请输入..."></Input>
  <h2>选择分类</h2>
  <Select v-model="category" style="width:200px">
    <Option v-for="item in categoryList" :value="item.id">{{ item.text }}</Option>
  </Select>


  <Upload action="/api/profile" name="img" :on-success="success" id="upload">
    <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
  </Upload>
  <h2>发布文章</h2>
  <div id="editor">
  <mavon-editor  v-model="content"   @save="submit" @imgAdd="imgAdd"/></mavon-editor>
  </div>
</div>
</template>

<script>
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
    created(){
      this.fetData();
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      addFenLei(){
        var that=this;
        this.$ajax.get('/api/addcategory',{
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
          this.$ajax.post('/api/findText',{
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

        this.$ajax.post('/api/findCategory',{

        })
          .then(function(response){
            console.log(response.data);
            that.categoryList=response.data;

          })
          .catch(function(err){
            console.log(err);
          });

      },
      success(response){
        this.content+=('![图片](http://localhost:8000/static/'+response.filename+')')
      },
      imgAdd(fileName,file){
        console.log(file);
        var oMyForm = new FormData();
        oMyForm.append("img", file);

        console.log(oMyForm);

        this.$ajax({
          url: '/api/profile',
          method: 'post',
          data: oMyForm,
          headers: { 'Content-Type': 'multipart/form-data' },
        })
          .then(function(response){
            console.log(response.data);

          })
          .catch(function(err){
            console.log(err);
          });

      },
      submit(value ,reder){
          if(this.$route.query.id){
            this.$ajax.post('/api/updateArticle',{
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
            this.$ajax.post('/api/addArticle',{
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
