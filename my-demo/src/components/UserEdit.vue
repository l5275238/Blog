<template>
<div class="hello">
<div>
  <div class="logo">
    <img v-bind:src="src">
  </div>

  <Upload action="/api/profile" name="img" :on-success="success">
    <Button type="ghost" icon="ios-cloud-upload-outline">上传头像</Button>
  </Upload>
</div>
  <div>
    <span>昵称</span>
    <Input v-model="name" placeholder="请输入..." style="width: 300px"></Input>
  </div>
  <div>
    <span>介绍</span>
    <Input v-model="text" placeholder="请输入..." style="width: 300px"></Input>
  </div>

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
      wenZhang:'',
      src:''
    }
  },
  created(){
    this.fetData();
  },
  methods:{
    goto(){
      this.$ajax.get('/api/updateUsers',{
        params:{
          text:this.text,
          name:this.name,
          url:this.src
        }
      })
        .then(function(response){
          console.log(response);
        })
        .catch(function(err){
          console.log(err);
        });
    },
    success(response, file, fileList){
      console.log(response);
      this.src=response.path;
    },
    fetData(){
        var that=this;
      this.$ajax.get('/api/user',{
      })
        .then(function(data){
          console.log(data);
          var obj=data.data[0];
          that.text=obj.text;
          that.name=obj.name;
          that.src=obj.url;
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
  .logo{
    width: 100px;
    height: 100px;
    border: 1px solid black;
  }
  .logo img{
    width: 100%;
  }
</style>
