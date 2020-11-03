import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    menuArray: [],
    activeTab: '云主机',
    activePath: '',
    breadHead: ['主机概览']
  },
  mutations: {
    updateTabData (state, payload) {
      state.activeTab = payload
    },
    updateActivePath (state, payload) {
      state.activePath = payload
    },
    updateBreadHead (state, payload) {
      state.breadHead = payload
    }
  },
  actions: {
    updateTabDataAsync (context, payload) {
      // console.log(payload)
      context.commit('updateTabData', payload)
    },
    updateActivePathAsync (context, payload) {
      context.commit('updateActivePath', payload)
    },
    updateBreadHeadAsync (context, payload) {
      context.commit('updateBreadHead', payload)
    }
  }
  // modules: {
  // }
})

export default store
