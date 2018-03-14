<template>
  <div class="m-addSection">
    <div class="u-add" @click="handleAdd">
      添加版块
    </div>
    <el-dialog title="增加版块" :visible.sync="dialogAddVisible">
      <div class="m-edit">
        <el-input style="margin-bottom: 15px;" v-model="addSectionForm.sec_name" autofocus placeholder="请输入版块名称"></el-input>
        <el-input style="margin-bottom: 15px;" @keydown.enter.native="addFormSubmit" v-model="addSectionForm.sec_label" placeholder="请输入版块标签"></el-input>
        <div class="u-btn">
          <el-button class="u-submit" type="primary" @click="addFormSubmit">提交
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="编辑版块" :visible.sync="dialogEditVisible">
      <div class="m-edit">
        <el-input style="margin-bottom: 15px;" v-model="editSectionForm.sec_name" autofocus placeholder="请输入版块名称"></el-input>
        <el-input style="margin-bottom: 15px;" @keydown.enter.native="editFormSubmit" v-model="editSectionForm.sec_label" placeholder="请输入版块标签"></el-input>
        <div class="u-btn">
          <el-button class="u-submit" type="primary" @click="editFormSubmit">提交
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </div>
      </div>
    </el-dialog>
    <div class="block">
      <el-table :data="sectionPage.pageData" style="width: 100%" stripe>
        <el-table-column label="版块名称" width="600">
          <template slot-scope="scope">
            {{scope.row.sec_name}}
          </template>
        </el-table-column>

        <el-table-column label="版块标签" width="353">
          <template slot-scope="scope">
            {{scope.row.sec_label}}
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :page-size="sectionPage.pageSize" layout="prev, pager, next, jumper" :total="sectionPage.totalCount">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import MessageBox from "../utils/MessageBox";
import { createNamespacedHelpers } from "vuex";
import api from "../api/api";
const { mapActions } = createNamespacedHelpers("routeStore");
export default {
  data() {
    return {
      addSectionForm: {
        sec_name: "",
        sec_label: ""
      },
      editSectionForm: {},
      deleteSectionForm: {
        id: -1
      },
      dialogAddVisible: false,
      dialogEditVisible: false,
      userData: [
        {
          username: "李四"
        },
        {
          username: "张三"
        }
      ],
      sectionPage: {}
    };
  },
  created() {
    api
      .ajax("sectionPage/get", { currentPage: 1 })
      .then(res => {
        this.sectionPage = res;
      })
      .catch(err => console.log(err));
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  beforeDestroy() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  methods: {
    ...mapActions(["setRouteList"]),
    editFormSubmit() {
      api
        .ajax("sectionChange/post", this.editSectionForm, "post")
        .then(res => {
          if (res > 0) {
            MessageBox.alert("成功", "提交成功");
          } else {
            MessageBox.alert("失败", "提交失败");
          }
          this.dialogEditVisible = false;
        })
        .catch(err => console.log(err));
    },
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1(val) {
      console.log(val);
      api
        .ajax("sectionPage/get", { currentPage: val })
        .then(res => {
          this.sectionPage = res;
        })
        .catch(err => console.log(err));
    },
    handleDelete(index, row) {
      this.deleteSectionForm.id = row.id;
      api
        .ajax("deleteSection/post", this.deleteSectionForm, "post")
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
          this.dialogAddVisible = false;
        });
    },
    handleAdd(index, row) {
      this.dialogAddVisible = true;
    },
    handleEdit(index, row) {
      this.editSectionForm = row;
      this.dialogEditVisible = true;
    },
    handleRelease(index, row) {
      console.log(index);
    },
    addFormSubmit() {
      api.ajax("addSection/post", this.addSectionForm, "post").then(res => {
        if (res > 0) {
          this.$alert("添加成功", "成功", {
            confirmButtonText: "确定",
            callback: () => {
              this.$router.go(0);
            }
          });
        } else {
          MessageBox.alert("失败", "添加失败");
        }
        this.dialogAddVisible = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/addSection";
</style>