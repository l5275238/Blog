<template>
<div class="hello">
  <div>
    <span>昵称</span>
    <Input v-model="name" placeholder="请输入..." style="width: 300px"></Input>
  </div>
  <div>
    <span>介绍</span>
    <Input v-model="text" placeholder="请输入..." style="width: 300px"></Input>
  </div>
  <Upload
  multiple
  type="drag"
  action="/api/profile"
  name="img">
  <div style="padding: 20px 0">
    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
    <p>点击或将文件拖拽到这里上传</p>
  </div>
</Upload>


  <Button type="info" @click="goto">保存</Button>
</div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
        name:null,
      value: '',
      text:null,
      content:'',
      wenZhang:''
    }
  },
  created(){
    this.fetData();
  },
  methods:{
    goto(){
      this.$ajax.post('/api/addText',{
        params:{
          text:this.content,
        }
      })
        .then(function(response){
          console.log(response);
        })
        .catch(function(err){
          console.log(err);
        });
    },
    fetData(){
        var that=this;
      this.$ajax.get('/api/user',{
        params:{
          ID:this.value
        }
      })
        .then(function(data){
          console.log(data);
          var obj=data.data[0];
          that.text=obj.text;
          that.name=obj.name;
        })
        .catch(function(err){
          console.log(err);
        });
      this.$ajax.post('/api/findText')
        .then(function(data){
          var obj=data.data[0];
          console.log(data);
          that.wenZhang=obj.text
        })
        .catch(function(err){
          console.log(err);
        });



    }
  },
  upload(response, file, fileList){
    console.log(fileList);
    console.log(file);
    console.log(response);
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
