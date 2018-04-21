<template>
  <div class="userManager">
    <el-tabs tab-position="top" style="height: 200px;">
      <el-tab-pane label="权限管理">
        <div class="block">
          <el-table :data="userSectionPage.pageData" style="width: 100%" stripe>
            <el-table-column label="用户名" width="130">
              <template slot-scope="scope">
                {{scope.row.username}}
              </template>
            </el-table-column>

            <el-table-column label="昵称" width="200">
              <template slot-scope="scope">
                {{scope.row.nickname}}
              </template>
            </el-table-column>

            <el-table-column label="权限" width="300">
              <template slot-scope="scope">
                <el-select v-model="scope.row.position" placeholder="请选择用户权限">
                  <el-option label="普通用户" value="普通用户"></el-option>
                  <el-option label="版主" value="版主"></el-option>
                  <el-option label="系统管理员" value="系统管理员"></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="版块名称" width="323">
              <template slot-scope="scope">
                <el-input placeholder="请输入版块名称" v-model="scope.row.section.sec_name" :disabled="scope.row.position != '版主'"></el-input>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleAuthority(scope.$index, scope.row)">提交</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="handleCurrentChange1" :page-size="userSectionPage.pageSize" layout="prev, pager, next, jumper" :total="userSectionPage.totalCount">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="用户解封">
        <div class="block">
          <el-table :data="userBanPage.pageData" style="width: 100%" stripe>
            <el-table-column label="被封号的用户名" width="200">
              <template slot-scope="scope">
                {{scope.row.username}}
              </template>
            </el-table-column>

            <el-table-column label="昵称" width="753">
              <template slot-scope="scope">
                {{scope.row.nickname}}
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleUnban(scope.$index, scope.row)">解封</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @current-change="handleCurrentChange2" :page-size="userBanPage.pageSize" layout="prev, pager, next, jumper" :total="userBanPage.totalCount">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MessageBox from "../utils/MessageBox";
import { createNamespacedHelpers } from "vuex";
import api from "../api";
const { mapActions } = createNamespacedHelpers("routeStore");
export default {
  data() {
    return {
      userSectionPage: {},
      userBanPage: []
    };
  },
  created() {
    if (this.$session.get("user")) {
      if (this.$session.get("user").position == "系统管理员") {
        api
          .ajax("userSectionPage/get", { currentPage: 1 })
          .then(res => {
            this.userSectionPage = res;
            api
              .ajax("userBanPage/get", { currentPage: 1 })
              .then(res => {
                this.userBanPage = res;
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      } else {
        this.$router.push({ name: "登录" });
      }
    } else {
      this.$router.push({ name: "登录" });
    }
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  beforeDestroy() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  methods: {
    ...mapActions(["setRouteList"]),
    handleUnban(index, row) {
      api.update(
        "/unBanUser/post",
        { id: row.id },
        this,
        { alert: true, fresh: true, suc: "解封成功", err: "解封失败" },
        "系统管理员"
      );
    },
    handleAuthority(index, row) {
      if (row.position != "版主") {
        api.update(
          "changeUserPosition/post",
          { id: row.id, position: row.position },
          this,
          { alert: true, suc: "提交成功", err: "提交失败" },
          "系统管理员"
        );
      } else {
        if (this.$session.get("user").position == "系统管理员") {
          api
            .ajax(
              "changeUserPositionSection/post",
              {
                id: row.id,
                position: row.position,
                sec_name: row.section.sec_name
              },
              "post"
            )
            .then(res => {
              if (res == -1) {
                MessageBox.alert("失败", "该板块不存在,请输入正确的版块名");
                return;
              }
              if (res > 0) {
                MessageBox.alert("成功", "提交成功");
              } else {
                MessageBox.alert("失败", "修改失败");
              }
            })
            .catch(err => console.log(err));
        } else {
          MessageBox.alert("失败", "操作失败,权限不足");
        }
      }
    },
    handleCurrentChange1(val) {
      api
        .ajax("userSectionPage/get", { currentPage: val })
        .then(res => {
          console.log(res);
          this.userSectionPage = res;
        })
        .catch(err => console.log(err));
    },
    handleCurrentChange2(val) {
      api
        .ajax("userBanPage/get", { currentPage: val })
        .then(res => {
          console.log(res);
          this.userBanPage = res;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/userManager";
</style>