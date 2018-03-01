<template>
  <div class="g-doc">
    <router-view></router-view>
    <div class="g-ft">
      <v-footer></v-footer>
    </div>
  </div>
</template>

<script>
import footer from "./components/footer";
export default {
  name: "App",
  components: {
    "v-footer": footer
  }
};
</script>

<style lang='scss'>
@import "./assets/scss/commons/reset";
@import "./assets/scss/App";
</style>
