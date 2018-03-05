import Vue from 'vue'
import Vuex from 'vuex'
import routeStore from './modules/routeStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    routeStore
  }
})
