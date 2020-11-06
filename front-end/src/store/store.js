import Vue from "vue";
import Vuex from "vuex";
import authentication from "./auth/auth"


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        authentication
    }
})
