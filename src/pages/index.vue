<template>
  <el-container>
    <el-aside width="160px" height="100%">
      <v-aside></v-aside>
    </el-aside>
    <el-container>
      <el-header height="50px">
        <v-header></v-header>
      </el-header>
      <el-main>
        <div class="banner">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :key="item.id" v-for="item in realList" :to="item.path">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view @freshNav="getRoutePath"></router-view>
        <router-link to="/test" @click="getRoutePath">test</router-link>
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
const { mapGetters } = createNamespacedHelpers("routeStore");
export default {
  data() {
    return {
      realList: []
    };
  },
  computed: {
    ...mapGetters(["routeList"])
  },
  created() {
    this.getRoutePath();
  },
  methods: {
    getRoutePath() {
      this.realList = JSON.parse(sessionStorage.getItem("routeList"));
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.realList = JSON.parse(sessionStorage.getItem("routeList"));
      });
    }
  },
  components: {
    vFooter,
    vHeader,
    vAside
  }
};
</script>

<style lang="scss" scoped>
.el-header,
.el-container,
.el-footer,
.el-aside,
.el-main {
  padding: 0;
}
</style>