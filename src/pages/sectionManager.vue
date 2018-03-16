<template>
  <div class="m-sectionManager">
    <el-tabs tab-position="top" style="height: 200px;">
      <el-tab-pane label="帖子管理">
        <el-dialog title="编辑帖子" :visible.sync="dialogEditVisible">
          <div class="m-edit">
            <el-input autofocus v-model="editArticleForm.title" placeholder="请输入帖子主题"></el-input>
            <el-select v-model="editArticleForm.art_label" placeholder="请选择帖子标签">
              <el-option label="置顶" value="置顶"></el-option>
              <el-option label="精华" value="精华"></el-option>
            </el-select>
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
            <el-table-column label="主题" width="360">
              <template slot-scope="scope">
                <router-link :to="{ name:'帖子', params: { sid: scope.row.sid, aid: scope.row.id }}">{{scope.row.title}}</router-link>
              </template>
            </el-table-column>

            <el-table-column label="帖子标签" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.art_label}}</span>
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
          <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :page-size="articlePage.pageSize" layout="prev, pager, next, jumper" :total="articlePage.totalCount">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="用户封号">
        <div class="block">
          <el-table :data="userAccusePage.pageData" style="width: 100%" stripe>
            <el-table-column label="被举报的用户名" width="200">
              <template slot-scope="scope">
                <router-link :to="{ name:'检测用户', params: { uid: scope.row.id,nickname: scope.row.nickname }}">{{scope.row.username}}</router-link>
              </template>
            </el-table-column>

            <el-table-column label="昵称" width="753">
              <template slot-scope="scope">
                <span>{{scope.row.nickname}}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleBan(scope.$index, scope.row)">封号</el-button>
                <el-button size="mini" type="danger" @click="handleRelease(scope.$index, scope.row)">释放</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :page-size="userAccusePage.pageSize" layout="prev, pager, next, jumper" :total="userAccusePage.totalCount">
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
      editArticleForm: {},
      articlePage: {},
      userAccusePage: {},
      content: "<h2>I am Example</h2>",
      title: "",
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
      },
      dialogEditVisible: false
    };
  },
  created() {
    if (this.$session.get("section") != null) {
      api
        .ajax("articlePageBySid/get", {
          sid: this.$session.get("section").id,
          currentPage: 1
        })
        .then(res => {
          this.articlePage = res;
          api
            .ajax("userAccusePage/get", { currentPage: 1 })
            .then(res => {
              this.userAccusePage = res;
            })
            .catch(err => console.log(err));
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
    submitEditArticleForm() {
      console.log(this.editArticleForm);
      api
        .ajax("changeArticle/post", this.editArticleForm, "post")
        .then(res => {
          if (res > 0) {
            MessageBox.alert("成功", "更新成功");
          }
          this.dialogEditVisible = false;
        })
        .catch(err => console.log(err));
    },
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1(val) {
      if (this.$session.get("section")) {
        api
          .ajax("articlePageBySid/get", {
            sid: this.$session.get("section").id,
            currentPage: val
          })
          .then(res => {
            this.articlePage = res;
          })
          .catch(err => console.log(err));
      }
    },
    handleSizeChange2(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange2(val) {
      if (this.$session.get("section")) {
        api
          .ajax("userAccusePage/get", { currentPage: val })
          .then(res => {
            this.userAccusePage = res;
            console.log(res);
          })
          .catch(err => console.log(err));
      }
    },
    handleDelete(index, row) {
      api.ajax("removeArticleById/post", { id: row.id }, "post").then(res => {
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
    },
    handleEdit(index, row) {
      this.dialogEditVisible = true;
      this.editArticleForm = row;
    },
    handleBan(index, row) {
      api
        .ajax("banUser/post", { id: row.id }, "post")
        .then(res => {
          if (res > 0) {
            this.$alert("封号成功", "成功", {
              confirmButtonText: "确定",
              callback: () => {
                this.$router.go(0);
              }
            });
          }
        })
        .catch(err => console.log(err));
    },
    handleRelease(index, row) {
      console.log(row.id);
      api
        .ajax("UnaccuseUser/post", { id: row.id }, "post")
        .then(res => {
          if (res > 0) {
            this.$alert("释放成功", "成功", {
              confirmButtonText: "确定",
              callback: () => {
                this.$router.go(0);
              }
            });
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/sectionManager";
</style>