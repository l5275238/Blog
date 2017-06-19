<template>
  <div class="hello">
    <Upload action="/api/profile" name="img" :on-success="success">
      <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
    </Upload>
    <mavon-editor @imgAdd="$imgAdd" @imgDel="$imgDel" v-model="value" @htmlcode="code" @save="save"/>
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
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    uploadimg(response){
      console.log(this.value);
    },
    $imgAdd(pos, $file){
      this.img_file[pos] = $file;
    },
    $imgDel(pos){
      delete this.img_file[pos];
    },
    success(response){
      this.value+=('![图片](http://localhost:8000/static/'+response.filename+')')
    },
    goto(){
      console.log(this.value);
      console.log(this.code);
    },

    code(status ,value){
      console.log(status);
      console.log(value);
    },
    save(value,reder){
      console.log(reder);
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
