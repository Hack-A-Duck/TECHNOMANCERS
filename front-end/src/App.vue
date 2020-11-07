<template>
  <div id="app">
    <app-header></app-header>
    <router-view v-if="show"></router-view>
  </div>
</template>

<script>
import appHeader from "./components/Header"
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      show: false
    }
  },
  components: {
    appHeader
  },
  async mounted(){
    try {
      await this.$store.dispatch("setUser");
      this.show=true;
    } catch (err) {
      this.show = true;
    }
  }
}
</script>

<style>

body{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  position: relative;
}
</style>
