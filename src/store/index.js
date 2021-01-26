import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuData: []
  },
  mutations: {
    SET_MENU: (state,data) =>{
      state.menuData = data
    }
  },
  actions: {},
  modules: {}
});
