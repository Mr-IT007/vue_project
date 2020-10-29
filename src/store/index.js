import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    data: {
      token: '',
      menuArray: []
    }
  },
  mutations: {
    updateData (state, payload) {
      state.data.token = payload.token
      state.data.menuArray = payload.menuArray
    }
  },
  actions: {
    updateDataAsync (context, payload) {
      // console.log(payload)
      context.commit('updateData', payload)
    }
  }
  // modules: {
  // }
})

export default store
