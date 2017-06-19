<template>
  <div id="app">

    <router-view></router-view>




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
</script>

<style>
  #app{
    height: 100%;
    position: absolute;
    width: 100%;
  }

</style>
