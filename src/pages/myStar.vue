<template>
  <div class="m-myStar">
    <div class="block">
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column label="主题" width="600">
          <template slot-scope="scope">
            <router-link :to="{ name:'帖子', params: { sid: 1, aid: scope.row.aid }}">{{scope.row.tit}}</router-link>
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

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

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
          tit:
            "上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄",
          commentCount: 1,
          aid: 1
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          tit: "上海市普陀区金沙江路 1518 弄",
          commentCount: 2,
          aid: 2
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          tit: "上海市普陀区金沙江路 1518 弄",
          commentCount: 2,
          aid: 3
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          tit: "上海市普陀区金沙江路 1518 弄",
          commentCount: 2,
          aid: 12
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleDelete(index, row) {
      console.log(index);
      console.log(row.aid);
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html;
      console.log(html);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/myStar";
</style>