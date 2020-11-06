<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import appHeader from "./components/Header"
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    appHeader
  },
  async mounted(){
    await this.$store.dispatch("setUser");
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
