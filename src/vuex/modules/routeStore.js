const state = {
  routeList: [],
  socket: {}
}

const getters = {
  routeList: state => {
    return state.routeList;
  },
  socket: state => {
    return state.socket;
  }
}

const mutations = {
  setRouteList(state, val) {
    state.routeList = val
  },
  setSocket(state, val) {
    state.socket = val
  }
}

const actions = {
  setRouteList(context, val) {
    context.commit('setRouteList', val)
  },
  setSocket(context, val) {
    context.commit('setSocket', val)
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
