<template>
  <div id="app">
    <transition
      name="bounce"
    >
    <router-view>
      WELCOME
    </router-view>

    </transition>


  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      spanLeft: 5,
      spanRight: 19,
      text:''
    }
  },
  computed: {
    iconSize () {
      return this.spanLeft === 5 ? 14 : 24;
    }
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
  }
}
</script>、


<style>
  #app{
    height: 100%;
    position: absolute;
    width: 100%;
    background: #FFF5E6;
  }
  .bounce-enter-active {
    transition: all .5s
  }

  .bounce-enter, .bounce-leave-active {
    opacity: 0;
    transform:  rotateZ(300deg) translateY(3000px);
    /*animation: bounce-in .5s reverse;*/
  }

</style>
