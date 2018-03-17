<template>
  <div class="m-myArticle">
    <el-dialog title="编辑帖子" :visible.sync="dialogEditVisible">
      <div class="m-edit">
        <el-input autofocus v-model="editArticleForm.title" placeholder="请输入帖子主题"></el-input>
        <quill-editor ref="myTextEditor" v-model="editArticleForm.content" :options="editorOption">
        </quill-editor>
        <div class="u-btn">
          <el-button class="u-submit" type="primary" @click="submitEditArticleForm">提交
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </div>
      </div>
    </el-dialog>
    <div class="block">
      <el-table :data="articlePage.pageData" style="width: 100%" stripe>
        <el-table-column label="主题" width="300">
          <template slot-scope="scope">
            <router-link :to="{ name:'帖子', params: { sid: scope.row.sid, aid: scope.row.id }}">{{scope.row.title}}</router-link>
          </template>
        </el-table-column>

        <el-table-column label="标签" width="120">
          <template slot-scope="scope">
            <span> {{scope.row.art_label}}</span>
          </template>
        </el-table-column>

        <el-table-column label="发帖时间" width="180">
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
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
import MessageBox from "../utils/MessageBox";
import { createNamespacedHelpers } from "vuex";
import api from "../api";
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
      articlePage: {},
      editArticleForm: {},
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
        // something config
      },
      dialogEditVisible: false
    };
  },
  created() {
    if (this.$session.get("user")) {
      api
        .ajax("articlePageByUid/get", {
          uid: this.$session.get("user").id,
          currentPage: 1
        })
        .then(res => {
          this.articlePage = res;
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
      if (this.$session.get("user")) {
        api
          .ajax("articlePageByUid/get", {
            uid: this.$session.get("user").id,
            currentPage: val
          })
          .then(res => {
            this.articlePage = res;
          })
          .catch(err => console.log(err));
      }
    },
    handleDelete(index, row) {
      api.delete("removeArticleById/post", row, this);
    },
    handleEdit(index, row) {
      this.dialogEditVisible = true;
      this.editArticleForm = row;
    },
    submitEditArticleForm() {
      api.update("changeArticle/post", this.editArticleForm, this, {
        alert: true,
        suc: "更新成功",
        err: "更新失败"
      });
      this.dialogEditVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/myArticle";
</style>