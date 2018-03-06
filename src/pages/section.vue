<template>
  <div class="section">
    <router-link :to="{name: '发表帖子', params: {id: $route.params.id} }" class="u-publish">发表帖子</router-link>
    <div class="block">
      <el-table :data="tableData" style="width: 100%" stripe>

        <el-table-column label="主题" width="600">
          <template slot-scope="scope">
            <router-link :to="{ name:'帖子', params: { id: scope.row.id }}">{{scope.row.tit}}</router-link>
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
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="回复">
          <template slot-scope="scope">
            <span @click="handleDelete(scope.$index, scope.row)">{{ scope.row.commentCount }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column label="作者">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/pages/section";
</style>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("routeStore");
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          tit: "上海市普陀区金沙江路 1518 弄",
          commentCount: 1,
          id: 1
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          tit: "上海市普陀区金沙江路 1518 弄",
          commentCount: 2,
          id: 2
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          tit: "上海市普陀区金沙江路 1518 弄",
          commentCount: 2,
          id: 3
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          tit: "上海市普陀区金沙江路 1518 弄",
          commentCount: 2,
          id: 12
        }
      ]
    };
  },
  methods: {
    ...mapActions(["setRouteList"]),
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleDelete(index, row) {
      console.log(index);
      console.log(row.id);
    }
  },
  created() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  beforeDestroy() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  }
};
</script>

