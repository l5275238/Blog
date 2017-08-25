<template>
<div id="heleo">
   <div>
     <h3 class="title">你好</h3>
     <div class="fenLei">分类呀</div>
     <div class="content">
       你好呀啊啊啊啊啊啊啊啊啊啊啊啊啊
     </div>
     <div class="time">2017.6.8</div>
   </div>
</div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
  .time{
    text-align: right;
  }
  .fenLei{
    text-align: right;
  }
</style>
