<template>
  <!-- <div class="article">this is article{{ $route.params.id }} </div>
   -->
  <div class="m-article">
    <el-dialog title="回复" :visible.sync="dialogReplyVisible">
      <div class="m-edit">
        <quill-editor ref="myTextEditor" v-model="replyForm.comment" :options="editorOption">
        </quill-editor>
        <div class="u-btn">
          <el-button @click.native="submitReplyForm" class="u-submit" type="primary">提交
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </div>
      </div>
    </el-dialog>
    <div class="m-contain">
      <el-row class="m-tit">
        <el-col :span="22">
          <div class="grid-box-tit">文章主题：
            <span v-if="article.art_label">【{{this.article.art_label}}】</span>
            {{this.article.title}}
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-box-tit u-star"><img @click="submitAddStar" src="../assets/img/star.png" alt="收藏帖子">
            <!-- <div>已收藏</div> -->
          </div>
        </el-col>
      </el-row>
      <div class="m-box">
        <el-row class="m-head">
          <el-col :span="4">
            <div class="grid-box-head m-userid">
              用户ID：{{this.article.uid}}
            </div>
          </el-col>
          <el-col :span="20">
            <div class="grid-box-head u-border-left">
              <el-row>
                <el-col :span="2" class="u-replyOne">
                  <div @click="handleReplyDialog">回复</div>
                </el-col>
                <el-col :span="1" :offset="21" class="u-floor">
                  <div>楼主</div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row class="m-main">
          <el-col :span="4">
            <div class="grid-box-aside">
              <div class="m-avatar">
                <img src="../assets/logo.png" alt="">
              </div>
              <div class="m-profile">
                <ul>
                  <li>昵称：
                    <i>{{this.article.author}}</i>
                  </li>
                  <li>年级：
                    <i>{{this.article.grade}}</i>
                  </li>
                  <li>文章：
                    <i>{{this.article.article_count}}</i>
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
          <el-col :span="20" style="border-left: 1px solid #c3d9ff;">
            <div class="grid-box-content">
              <div class="ql-container ql-snow" style="height:100%;border: 0;">
                <div class="ql-editor" v-html="article.content"></div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="m-foot">
          <el-col :span="4">
            <div class="grid-box-foot">
              <el-row class="m-func">
                <el-col :span="8">
                  <img src="../assets/img/scan.png" alt="">
                  <router-link :to="{name:'用户信息',params:{uid: article.uid}}">查看</router-link>
                </el-col>
                <el-col :span="8">
                  <img src="../assets/img/msg.png" alt="">
                  <a href="#">发信</a>
                </el-col>
                <el-col :span="8">
                  <img src="../assets/img/add.png" alt="">
                  <a href="#">加友</a>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="grid-box-foot u-border-left">
              <el-row class="u-praise-blame">
                <el-col :span="2">
                </el-col>
                <el-col :span="2">
                </el-col>
                <el-col :span="3" :offset="17">
                  {{this.article.date}}
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="m-contain">
      <el-row class="m-tit">
        <el-col :span="22">
          <div class="grid-box-tit">文章主题：
            <span v-if="article.art_label">【{{this.article.art_label}}】</span>
            {{this.article.title}}
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-box-tit u-star"><img @click="submitAddStar" src="../assets/img/star.png" alt="收藏帖子">
            <!-- <div>已收藏</div> -->
          </div>
        </el-col>
      </el-row>
      <div class="m-box">
        <el-row class="m-head">
          <el-col :span="4">
            <div class="grid-box-head m-userid">
              用户ID：{{this.article.uid}}
            </div>
          </el-col>
          <el-col :span="20">
            <div class="grid-box-head u-border-left">
              <el-row>
                <el-col :span="2" class="u-replyOne">
                  <div @click="handleReplyDialog">回复</div>
                </el-col>
                <el-col :span="1" :offset="21" class="u-floor">
                  <div>楼主</div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row class="m-main">
          <el-col :span="4">
            <div class="grid-box-aside">
              <div class="m-avatar">
                <img src="../assets/logo.png" alt="">
              </div>
              <div class="m-profile">
                <ul>
                  <li>昵称：
                    <i>{{this.article.author}}</i>
                  </li>
                  <li>年级：
                    <i>{{this.article.grade}}</i>
                  </li>
                  <li>文章：
                    <i>{{this.article.article_count}}</i>
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
          <el-col :span="20" style="border-left: 1px solid #c3d9ff;">
            <div class="grid-box-content">
              <div class="ql-container ql-snow" style="height:100%;border: 0;">
                <div class="ql-editor" v-html="article.content"></div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="m-foot">
          <el-col :span="4">
            <div class="grid-box-foot">
              <el-row class="m-func">
                <el-col :span="8">
                  <img src="../assets/img/scan.png" alt="">
                  <router-link :to="{name:'用户信息',params:{uid: article.uid}}">查看</router-link>
                </el-col>
                <el-col :span="8">
                  <img src="../assets/img/msg.png" alt="">
                  <a href="#">发信</a>
                </el-col>
                <el-col :span="8">
                  <img src="../assets/img/add.png" alt="">
                  <a href="#">加友</a>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="grid-box-foot u-border-left">
              <el-row class="u-praise-blame">
                <el-col :span="2">
                  <img src="../assets/img/praise.png" alt="" style="margin-bottom: 4px;">123
                </el-col>
                <el-col :span="2">
                  <img src="../assets/img/blame.png" alt="">11
                </el-col>
                <el-col :span="3" :offset="17">
                  {{this.article.date}}
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
    </el-pagination>
    <div class="m-reply">
      <quill-editor ref="myTextEditor" v-model="commentForm.comment" :options="editorOption">
      </quill-editor>
      <div class="u-btn">
        <el-button class="u-submit" type="primary" @click="submitCommentForm">提交
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </div>
    </div>

  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import api from "../api";
import MessageBox from "../utils/MessageBox";
const { mapActions } = createNamespacedHelpers("routeStore");
import { quillEditor } from "vue-quill-editor";
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
      commentForm: {
        comment: "",
        uid: 0,
        aid: 0,
        date: "",
        author: ""
      },
      replyForm: {
        comment: "",
        uid: 0,
        aid: 0,
        date: "",
        author: "",
        from_content: "",
        from_nickname: ""
      },
      article: {},
      dialogReplyVisible: false,
      replyOne: "",
      content:
        "<p>大家好</p><p>大家好</p><p>大家好</p><p>大家好</p><p>大家好</p><p>大家好</p><p>大家好</p><p>大家好</p><p>大家好</p><p>大家好</p><p>大家好</p><p>大家好</p><p>大家好</p><p>大家好</p><p>大家好</p><p>大家好</p><p>大家好</p><p>大家好</p>",
      reply: "",
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
        // something config
      }
    };
  },
  created() {
    api
      .ajax("articleBySidAid/get", {
        sid: this.$route.params.sid,
        aid: this.$route.params.aid
      })
      .then(res => {
        this.article = res;
      })
      .catch(err => console.log(err));
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  beforeDestroy() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  methods: {
    ...mapActions(["setRouteList"]),
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.reply = html;
      console.log(html);
    },
    handleReplyDialog() {
      this.replyForm.date = new Date().format("yyyy-MM-dd hh:mm");
      this.replyForm.uid = this.$session.get("user").id;
      this.replyForm.author = this.$session.get("user").nickname;
      this.replyForm.from_nickname = this.article.author;
      this.replyForm.from_content = this.article.content;
      this.replyForm.aid = this.$route.params.aid;
      this.dialogReplyVisible = true;
    },
    submitCommentForm() {
      this.commentForm.date = new Date().format("yyyy-MM-dd hh:mm");
      this.commentForm.uid = this.$session.get("user").id;
      this.commentForm.author = this.$session.get("user").nickname;
      this.commentForm.aid = this.$route.params.aid;
      api
        .ajax("addComment/post", this.commentForm, "post")
        .then(res => {
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
        })
        .catch(err => console.log(err));
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    submitReplyForm() {
      api
        .ajax("addComment/post", this.replyForm, "post")
        .then(res => {
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
        })
        .catch(err => console.log(err));
    },
    submitAddStar() {
      api
        .ajax(
          "addArticleStar/post",
          {
            uid: this.$session.get("user").id,
            aid: this.article.id
          },
          "post"
        )
        .then(res => {
          if (res > 0) {
            MessageBox.alert("成功", "收藏成功");
          } else {
            MessageBox.alert("失败", "收藏失败");
          }
        });
    }
  },
  components: {
    quillEditor
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/article";
</style>