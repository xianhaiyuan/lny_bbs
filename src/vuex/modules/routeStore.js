const state = {
  routeList: []
}

const getters = {
  routeList: state => {
    return state.routeList;
  }
}

const mutations = {
  addRoute(state, val) {
    state.routeList.push(val)
  },
  removeRoute(state, val) {
    state.routeList.splice(val.start, val.end)
  }
}

const actions = {
  addRoute(context, val) {
    context.commit('addRoute', val)
  },
  removeRoute(context, val) {
    context.commit('removeRoute', val)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}

/*
例子
store.state.routeStore.routeList  //拿getters

import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("routeStore");

computed: {
    ...mapGetters(["routeList"])
  }
this.$store.getters.routeList;  //使用map后拿getters
*/
