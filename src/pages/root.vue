<template>
  <el-container>
    <el-aside width="170px" height="100%">
      <v-aside></v-aside>
    </el-aside>
    <el-container>
      <el-header height="50px">
        <v-header></v-header>
      </el-header>
      <el-main>
        <div class="banner">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :key="item.id" v-for="(item,index) in routeList" :to="item.path">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view @freshNav="getRoutePath"></router-view>
      </el-main>
      <el-footer>
        <v-footer></v-footer>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import vFooter from "../components/footer";
import vHeader from "../components/header";
import vAside from "../components/aside";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("routeStore");
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["routeList"])
  },
  created() {
    this.getRoutePath();
  },
  methods: {
    getRoutePath() {
      this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
    },
    // beforeRouteEnter(to, from, next) {
    //   next(vm => {
    //     vm.realList = JSON.parse(sessionStorage.getItem("routeList"));
    //   });
    // },
    ...mapActions(["setRouteList"])
  },
  components: {
    vFooter,
    vHeader,
    vAside
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/root";
</style>