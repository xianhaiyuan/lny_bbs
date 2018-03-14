<template>
  <div class="m-addSection">
    <div class="u-add" @click="handleAdd">
      添加版块
    </div>
    <el-dialog title="增加版块" :visible.sync="dialogAddVisible">
      <div class="m-edit">
        <el-input style="margin-bottom: 15px;" autofocus placeholder="请输入版块名称"></el-input>
        <el-input style="margin-bottom: 15px;" placeholder="请输入版块标签"></el-input>
        <div class="u-btn">
          <el-button class="u-submit" type="primary" @click="showContent">提交
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="编辑版块" :visible.sync="dialogEditVisible">
      <div class="m-edit">
        <el-input style="margin-bottom: 15px;" v-model="sectionForm.sec_name" autofocus placeholder="请输入版块名称"></el-input>
        <el-input style="margin-bottom: 15px;" v-model="sectionForm.sec_label" placeholder="请输入版块标签"></el-input>
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
    let toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"] // remove formatting button
    ];
    return {
      sectionForm: {
        id: "",
        sec_name: "",
        sec_label: ""
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
    editFormSubmit() {},
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1(val) {
      api
        .ajax("sectionPage/get", { currentPage: val })
        .then(res => {
          console.log(res);
          this.sectionPage = res;
        })
        .catch(err => console.log(err));
    },
    handleDelete(index, row) {
      console.log(index);
      console.log(row.aid);
    },
    handleAdd(index, row) {
      this.dialogAddVisible = true;
      console.log(index, row);
    },
    handleEdit(index, row) {
      console.log(row.id);
      this.sectionForm.sec_id = row.sec_id;
      this.sectionForm.sec_name = row.sec_name;
      this.sectionForm.sec_label = row.sec_label;
      this.dialogEditVisible = true;
    },
    handleRelease(index, row) {
      console.log(index);
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html;
      console.log(html);
    },
    showContent() {
      console.log(this.content);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/addSection";
</style>