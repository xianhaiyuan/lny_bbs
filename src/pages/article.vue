<template>
  <div>
    article,params:{{ $route.params.userid }} query: {{ $route.query.userid }} user:{{ this.getUser }}
  </div>
</template>

<script>
import qs from "querystring";
export default {
  data() {
    return {
      user: ""
    };
  },
  computed: {
    getUser() {
      return qs.parse(sessionStorage.getItem("user")).name;
    }
  },
  created() {
    console.log(qs.parse(sessionStorage.getItem("user")).name);
  }
};
</script>

<style scoped>

</style>