<template>
  <div>
    article,params:{{ $route.params.userid }} query: {{ $route.query.userid }} user:{{ this.getUser }}
  </div>
</template>

<script>
import qs from "querystring";
export default {
  data() {
    return {};
  },
  computed: {
    getUser() {}
  },
  created() {}
};
</script>

<style scoped>

</style>