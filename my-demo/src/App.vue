<template>
  <div id="app">
    <router-view>
      WELCOME
    </router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      spanLeft: 5,
      spanRight: 19,
      text:'',
    }
  },

  beforeCreate:function () {
debugger
  },
  created:function () {
    debugger

  },
  beforeMount:function () {
    debugger
    var div=document.getElementById('app');
    div.style.transform='translateX(100%)';
  },
  mounted:function () {
    var div=document.getElementById('wel');
    var app1=document.getElementById('app');
    div.style.transform='translateX(-100%)';
    app1.style.transform='translateX(0%)';

  },
  methods: {
    toggleClick () {
      if (this.spanLeft === 5) {
        this.spanLeft = 2;
        this.spanRight = 22;
      } else {
        this.spanLeft = 5;
        this.spanRight = 19;
      }
    },
    routeTo (name){
      this.$router.push(name);
      this.text=name;
    }
  },

}
</script>


<style>
  #app{
    transition: all 1s;
    overflow: hidden;
  }
  .bounce-enter-active {
    transition: all 10s
  }

  .bounce-enter, .bounce-leave-active {
    opacity: 0;
    transform: scale(0.5) rotateY(100deg);
    /*animation: bounce-in .5s reverse;*/
  }


</style>
