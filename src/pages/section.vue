<template>
  <div class="m-section">
    <router-link :to="{name: '发表帖子', params: {sid: $route.params.sid} }" class="u-publish">发表帖子</router-link>
    <div class="block">
      <el-table :data="articlePage.pageData" style="width: 100%" stripe>
        <el-table-column label="主题" width="600">
          <template slot-scope="scope">
            <router-link :to="{ name:'帖子', params: { sid: $route.params.sid, aid: scope.row.id }}">
              <span style="color:#ff3232;" v-if="scope.row.art_label">【{{scope.row.art_label}}】</span>{{scope.row.title}}</router-link>
          </template>
        </el-table-column>

        <el-table-column label="发帖时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 3px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="作者">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column label="回复">
          <template slot-scope="scope">
            <span>{{ scope.row.reply_count }}</span>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination @current-change="handleCurrentChange" :page-size="articlePage.pageSize" layout="prev, pager, next, jumper" :total="articlePage.totalCount">
      </el-pagination>
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
      articlePage: {}
    };
  },
  created() {
    api
      .ajax("articlePageBySid/get", {
        sid: this.$route.params.sid,
        currentPage: 1
      })
      .then(res => {
        this.articlePage = res;
      })
      .catch(err => console.log(err));
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  beforeDestroy() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  methods: {
    ...mapActions(["setRouteList"]),
    handleCurrentChange(val) {
      api
        .ajax("articlePageBySid/get", {
          sid: this.$route.params.sid,
          currentPage: val
        })
        .then(res => {
          this.articlePage = res;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/pages/section";
</style>

