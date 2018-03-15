<template>
  <div class="m-myStar">
    <div class="block">
      <el-table :data="articlePage.pageData" style="width: 100%" stripe>
        <el-table-column label="主题" width="600">
          <template slot-scope="scope">
            <router-link :to="{ name:'帖子', params: { sid: 1, aid: scope.row.id }}">{{scope.row.title}}</router-link>
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
            <span @click="handleDelete(scope.$index, scope.row)">{{ scope.row.reply_count }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="articlePage.pageSize" layout="prev, pager, next, jumper" :total="articlePage.totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import MessageBox from "../utils/MessageBox";
import api from "../api";
const { mapActions } = createNamespacedHelpers("routeStore");
export default {
  data() {
    return {
      articlePage: {}
    };
  },
  created() {
    if (this.$session.get("user")) {
      api
        .ajax("articlePageByStar/get", {
          uid: this.$session.get("user").id,
          currentPage: 1
        })
        .then(res => {
          this.articlePage = res;
          console.log(res);
        })
        .catch(err => console.log(err));
    }

    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  beforeDestroy() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  methods: {
    ...mapActions(["setRouteList"]),
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      if (this.$session.get("user") != null) {
        api
          .ajax("articlePageByStar/get", {
            uid: this.$session.get("user").id,
            currentPage: val
          })
          .then(res => {
            this.articlePage = res;
            console.log(res);
          })
          .catch(err => console.log(err));
      }
    },
    handleDelete(index, row) {
      if (this.$session.get("user") != null) {
        api
          .ajax(
            "removeArticleByStar/post",
            { uid: this.$session.get("user").id, aid: row.id },
            "post"
          )
          .then(res => {
            if (res > 0) {
              this.$alert("删除成功", "成功", {
                confirmButtonText: "确定",
                callback: () => {
                  this.$router.go(0);
                }
              });
            } else {
              MessageBox.alert("失败", "删除失败");
            }
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/myStar";
</style>