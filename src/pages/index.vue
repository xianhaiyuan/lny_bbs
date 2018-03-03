<template>
  <div>
    index,params:{{ $route.params.userid }} query: {{ $route.query.userid }} user:{{ this.$session.get("user") }}
  </div>
</template>

<script>
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