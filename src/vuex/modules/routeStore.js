const state = {
  routeList: []
}

const getters = {
  routeList: state => {
    return state.routeList;
  }
}

const mutations = {
  setRouteList(state, val) {
    state.routeList = val
  }
}

const actions = {
  setRouteList(context, val) {
    context.commit('setRouteList', val)
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
