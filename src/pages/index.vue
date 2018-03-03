<template>
  <el-container>
    <el-aside width="160px">
      <v-aside></v-aside>
    </el-aside>
    <el-container>
      <el-header height="50px">
        <v-header></v-header>
      </el-header>
      <el-main>
        <router-view></router-view>
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
export default {
  data() {
    return {};
  },
  components: {
    vFooter,
    vHeader,
    vAside
  },
  computed: {
    getUser() {}
  },
  created() {}
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