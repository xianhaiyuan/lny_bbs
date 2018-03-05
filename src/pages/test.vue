<template>
  <div>
    <router-link to='/'>index</router-link>
  </div>
</template>

<script>
export default {
  created() {
    this.$emit("freshNav");
  },
  destroyed() {
    this.$emit("freshNav");
  }
};
</script>

<style scoped>

</style>