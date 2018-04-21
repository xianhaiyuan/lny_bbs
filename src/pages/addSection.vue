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

      <el-pagination @current-change="handleCurrentChange1" :page-size="sectionPage.pageSize" layout="prev, pager, next, jumper" :total="sectionPage.totalCount">
      </el-pagination>
    </div>

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
    if (this.$session.get("user")) {
      if (this.$session.get("user").position == "系统管理员") {
        api
          .ajax("sectionPage/get", { currentPage: 1 })
          .then(res => {
            this.sectionPage = res;
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
    editFormSubmit() {
      api.update(
        "sectionChange/post",
        this.editSectionForm,
        this,
        {
          alert: true,
          suc: "提交成功",
          err: "提交失败"
        },
        "系统管理员"
      );
      this.dialogEditVisible = false;
    },
    handleCurrentChange1(val) {
      api
        .ajax("sectionPage/get", { currentPage: val })
        .then(res => {
          this.sectionPage = res;
        })
        .catch(err => console.log(err));
    },
    handleDelete(index, row) {
      this.deleteSectionForm.id = row.id;
      api.delete(
        "deleteSection/post",
        this.deleteSectionForm,
        this,
        "系统管理员"
      );
    },
    handleAdd() {
      this.dialogAddVisible = true;
    },
    handleEdit(index, row) {
      this.editSectionForm = row;
      this.dialogEditVisible = true;
    },
    addFormSubmit() {
      api.insert("addSection/post", this.addSectionForm, this, "系统管理员");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/addSection";
</style>