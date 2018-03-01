<template>
  <div class="g-doc">
    <div class="g-hd">
      <v-header></v-header>
    </div>
    <div class="g-bd">
      <div class="g-mn">
        <figure id="u-lgi-pic">
          <a href="#">
            <img src="../assets/img/May.jpg" alt="点击进入岭南园">
          </a>
        </figure>
        <e-button></e-button>
      </div>
    </div>
  </div>
</template>
<script>
import header from "../components/header";

export default {
  name: "v-index",
  data() {
    return {};
  },
  components: {
    "v-header": header
  },
  methods: {
    name() {}
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/pages/index";
</style>
