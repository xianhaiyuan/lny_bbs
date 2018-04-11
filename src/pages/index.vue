<template>
  <div class="m-index">

    <div v-for="(sec, index) in sections" class="card">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <router-link :to="{ name:'版面列表', params: { sid: sec.id }}" :class="['card-tit',{blue: index%3==0},{orange: index%3==1},{green: index%3==2}]">{{ sec.sec_name }}</router-link>
          <span style="float: right; padding: 3px 0;color:#F29C9F ;" type="text">{{ sec.sec_label}}</span>
        </div>
        <div v-for="(item, index) in sec.articles" v-if="index<8" class="text item">
          <router-link :to="{ name:'帖子', params: {sid: item.sid, aid: item.id}}" style="display:block;">
            <span style="color:#ff3232;" v-if="item.art_label">【{{item.art_label}}】</span>
            {{ item.title }}</router-link>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import api from "../api";
const { mapActions } = createNamespacedHelpers("routeStore");
export default {
  data() {
    return {
      sections: []
    };
  },
  created() {
    api
      .ajax("AllSection/get", {})
      .then(res => {
        this.sections = res;
      })
      .catch(err => console.log(err));
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  beforeDestroy() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  methods: {
    ...mapActions(["setRouteList"])
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/index";
</style>