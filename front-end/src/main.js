import Vue from 'vue'
import App from './App.vue';
import VueRouter from "vue-router"
import {routes} from "./route"
import store from "./store/store"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
