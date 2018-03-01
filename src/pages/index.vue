<template>
  <div class="g-doc">
    <div class="g-hd">
      <v-header></v-header>
    </div>
    <div class="g-bd">
      <div class="g-mn">
      </div>
    </div>
    <div class="g-ft">
      <v-footer></v-footer>
    </div>
  </div>
</template>
<script>
import header from "../components/header";
import footer from "../components/footer";
export default {
  name: "index",
  data() {
    return {};
  },
  components: {
    "v-header": header,
    "v-footer": footer
  },
  methods: {
    name() {}
  }
};
</script>
<style lang="scss" scoped>

</style>
