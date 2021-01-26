import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    menuList: []
  },
  mutations: {
    addMenuList (state,menuList) {
      state.menuList = menuList
    }
  }
})

export default store