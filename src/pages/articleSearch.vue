<template>
  <div class="m-articleSearch">
    <div class="m-list">
      <el-row class="m-item" v-for="(item,index) in searchPage.pageData" :key="item.id">
        <el-col :span="24">
          <router-link :to="{name: '帖子',params:{sid:item.sid,aid:item.id}}" class="m-tit" v-html="item.title">
          </router-link>
        </el-col>
        <el-col class="m-content" :span="24">
          <p v-html="item.content"></p>
          <p>...</p>
        </el-col>
        <el-col :span="24" class="m-etc">
          <el-row>
            <el-col :span="3" :offset="17" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">作者：{{item.author}}</el-col>
            <el-col :span="4">日期：{{item.date}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-pagination @current-change="handleCurrentChange" :page-size="searchPage.pageSize" layout="prev, pager, next, jumper" :total="searchPage.totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from "../api";
import MessageBox from "../utils/MessageBox";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("routeStore");
export default {
  data() {
    return {
      searchPage: {}
    };
  },
  created() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
    api
      .ajax("searchArticlePage/get", {
        keyword: this.$route.params.keyword,
        currentPage: 1
      })
      .then(res => {
        this.searchPage = res;
        console.log(res.pageData);
      });
  },
  beforeDestroy() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  methods: {
    ...mapActions(["setRouteList"]),
    handleCurrentChange(val) {
      api
        .ajax("searchArticlePage/get", {
          keyword: this.$route.params.keyword,
          currentPage: val
        })
        .then(res => {
          this.searchPage = res;
          console.log(res.pageData);
        });
    }
  },
  watch: {
    $route(to, from) {
      console.log("keyword:" + this.$route.params.keyword);
      api
        .ajax("searchArticlePage/get", {
          keyword: this.$route.params.keyword,
          currentPage: 1
        })
        .then(res => {
          this.searchPage = res;
          console.log(res.pageData);
        });
      this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/articleSearch";
</style>