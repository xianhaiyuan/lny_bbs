<template>
  <div class="m-checkUser">
    <el-tabs tab-position="top" style="height: 200px;">
      <el-tab-pane :label='this.$route.params.nickname+"的帖子"'>
        <el-dialog title="帖子内容" :visible.sync="dialogArticleVisible">
          <div class="ql-container ql-snow" style="height:235px;width:100%;overflow-y:auto;">
            <div class="ql-editor" v-html="this.article"></div>
          </div>
        </el-dialog>
        <div class="block">
          <el-table :data="articlePage.pageData" style="width: 100%" stripe>
            <el-table-column label="主题" width="400">
              <template slot-scope="scope">
                <router-link :to="{ name:'帖子', params: { sid: scope.row.sid, aid: scope.row.id }}">{{scope.row.title}}</router-link>
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
                <span>{{ scope.row.reply_count }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleArticleDialog(scope.$index, scope.row)">内容</el-button>
                <el-button size="mini" type="danger" @click="articleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :page-size="articlePage.pageSize" layout="prev, pager, next, jumper" :total="articlePage.totalCount">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="this.$route.params.nickname + '的评论'">
        <div class="block">
          <el-dialog title="评论内容" :visible.sync="dialogCommentVisible">
            <div class="ql-container ql-snow" style="height:235px;width:100%;overflow-y:auto;">
              <div class="ql-editor" v-html="this.comment"></div>
            </div>
          </el-dialog>
          <el-table :data="commentPage.pageData" style="width: 100%" stripe>
            <el-table-column label="所在文章" width="353">
              <template slot-scope="scope">
                <router-link :to="{ name:'帖子', params: { sid: scope.row.sid, aid: scope.row.aid }}">{{scope.row.title}}</router-link>
              </template>
            </el-table-column>

            <el-table-column label="评论时间" width="200">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 3px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>

            <el-table-column label="点赞个数" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.praise }}</span>
              </template>
            </el-table-column>

            <el-table-column label="被踩个数" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.blame }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleCommentDialog(scope.$index, scope.row)">内容</el-button>
                <el-button size="mini" type="danger" @click="commentDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :page-size="commentPage.pageSize" layout="prev, pager, next, jumper" :total="commentPage.totalCount">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import api from "../api";
import MessageBox from "../utils/MessageBox";
import { createNamespacedHelpers } from "vuex";
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
      commentPage: {},
      username: "lisi",
      article: "<h2>I am article</h2>",
      comment: "",
      tit: "",
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
      },
      dialogArticleVisible: false,
      dialogCommentVisible: false,
      commentData: [
        {
          username: "李四",
          tit: "tit1",
          aid: 1
        },
        {
          username: "张三",
          tit: "tit2",
          aid: 2
        }
      ],
      articleData: [
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
    api
      .ajax("articlePageByUid/get", {
        uid: this.$route.params.uid,
        currentPage: 1
      })
      .then(res => {
        this.articlePage = res;
        api
          .ajax("commentPageByUid/get", {
            currentPage: 1,
            uid: this.$route.params.uid
          })
          .then(res => {
            this.commentPage = res;
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  beforeDestroy() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  methods: {
    ...mapActions(["setRouteList"]),
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1(val) {
      api
        .ajax("articlePageByUid/get", {
          uid: this.$route.params.uid,
          currentPage: val
        })
        .then(res => {
          this.articlePage = res;
        })
        .catch(err => console.log(err));
    },
    handleSizeChange2(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange2(val) {
      api
        .ajax("commentPageByUid/get", {
          currentPage: val,
          uid: this.$route.params.uid
        })
        .then(res => {
          this.commentPage = res;
        })
        .catch(err => console.log(err));
    },
    articleDelete(index, row) {
      api.delete("removeArticleById/post", { id: row.id }, this, "版主");
    },
    handleArticleDialog(index, row) {
      this.dialogArticleVisible = true;
      this.article = row.content;
    },
    handleCommentDialog(index, row) {
      this.comment = row.comment;
      this.dialogCommentVisible = true;
    },
    commentDelete(index, row) {
      api.delete("removeCommentById/post", { id: row.id }, this, "版主");
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.article = html;
      console.log(html);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/checkUser";
</style>