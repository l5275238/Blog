<template>
<div class="Addarticle">
  <Input v-model="title" type="textarea" :autosize="{minRows: 2}" placeholder="请输入..."></Input>
  <Select v-model="category" style="width:200px">
    <Option v-for="item in categoryList" :value="item.id">{{ item.text }}</Option>
  </Select>
  <Button type="primary" @click="modal6 = true">添加文章分类</Button>

  <Modal
    v-model="modal6"
    title="添加分类"
    @on-ok="addFenLei">
    <Input v-model="fenLei" placeholder="请输入..." style="width: 300px"></Input>
  </Modal>
  <Button type="info" @click="submit()">保存</Button>
  <quill-editor ref="myTextEditor" v-model="content" style="height: 300px">
  </quill-editor>

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
        content:''
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
      submit(){
        this.$ajax.post('/api/addArticle',{
          params:{
            title:this.title,
            cateId:this.category,
            text:this.content,
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
</style>
