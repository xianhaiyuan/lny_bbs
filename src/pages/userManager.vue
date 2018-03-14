<template>
  <div class="userManager">
    <el-tabs tab-position="top" style="height: 200px;">
      <el-tab-pane label="权限管理">
        <div class="block">
          <el-table :data="userAuthority" style="width: 100%" stripe>
            <el-table-column label="用户" width="230">
              <template slot-scope="scope">
                {{scope.row.username}}
              </template>
            </el-table-column>

            <el-table-column label="权限" width="300">
              <template slot-scope="scope">
                <el-select v-model="scope.row.position" placeholder="请选择活动区域">
                  <el-option label="普通用户" value="普通用户"></el-option>
                  <el-option label="版主" value="版主"></el-option>
                  <el-option label="系统管理员" value="系统管理员"></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="版块名称" width="423">
              <template slot-scope="scope">
                <el-input placeholder="请输入版块名称" :disabled="scope.row.position != '版主'" v-model="sec_name"></el-input>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleAuthority(scope.$index, scope.row)">提交</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="用户解封">
        <div class="block">
          <el-table :data="userRelease" style="width: 100%" stripe>
            <el-table-column label="被封号的用户" width="953">
              <template slot-scope="scope">
                {{scope.row.username}}
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleRelease(scope.$index, scope.row)">解封</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MessageBox from "../utils/MessageBox";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("routeStore");
export default {
  data() {
    return {
      sec_name: "",
      userAuthority: [
        {
          username: "李四子",
          position: "普通用户"
        },
        {
          username: "张飞",
          position: "版主"
        }
      ],
      userRelease: [
        {
          username: "李四"
        },
        {
          username: "张三"
        }
      ]
    };
  },
  created() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  beforeDestroy() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  methods: {
    ...mapActions(["setRouteList"]),
    handleAuthority(index, row) {},
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/userManager";
</style>