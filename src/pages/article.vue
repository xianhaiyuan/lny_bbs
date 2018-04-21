<template>
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
    <div class="m-contain" v-show="articleDialogVisible">
      <el-row class="m-tit">
        <el-col :span="22">
          <div class="grid-box-tit">文章主题：
            <span v-if="article.art_label">【{{this.article.art_label}}】</span>
            {{this.article.title}}
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-box-tit u-star"><img @click="submitAddStar" src="../assets/img/star.png" alt="收藏帖子">
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
              <el-row style="padding-left:15px;">
                <el-col :span="1" class="u-replyOne">
                  <div @click="handleReplyDialog(article.content,article.author)">回复</div>
                </el-col>
                <el-col :span="1" class="u-deleteOne">
                  <div v-if="handleDeleteVisible" @click="submitDeleteArticleForm(article)">删除</div>
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
                  <router-link :to="{name:'用户信息',params:{uid: this.article.uid || 0}}">查看</router-link>
                </el-col>
                <el-col :span="8">
                  <img src="../assets/img/msg.png" alt="">
                  <div class="u-send" href="#" @click="handleMessageDialog(article.uid,article.author)">发信</div>
                </el-col>
                <el-col :span="8">
                  <img src="../assets/img/add.png" alt="">
                  <div class="u-addf" @click="addFriend(article.uid)">加友</div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="grid-box-foot u-border-left">
              <el-row class="u-praise-blame">
                <el-col :span="2">
                  <img @click="submitArticlePraise(article)" src="../assets/img/praise.png" alt="" style="margin-bottom: 4px;">{{article.praise}}
                </el-col>
                <el-col :span="2">
                  <img @click="submitArticleBlame(article)" src="../assets/img/blame.png" alt="">{{article.blame}}
                </el-col>
                <el-col :span="3" :offset="17">
                  {{article.date}}
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="m-contain" v-for="(item,index) in commentPage.pageData">
      <div class="m-box">
        <el-row class="m-head">
          <el-col :span="4">
            <div class="grid-box-head m-userid">
              用户ID：{{item.uid}}
            </div>
          </el-col>
          <el-col :span="20">
            <div class="grid-box-head u-border-left">
              <el-row style="padding-left:15px;">
                <el-col :span="1" class="u-replyOne">
                  <div @click="handleReplyDialog(item.comment,item.author)">回复</div>
                </el-col>
                <el-col :span="1" class="u-deleteOne">
                  <div v-if="handleDeleteVisible" @click="submitDeleteCommentForm(item)">删除</div>
                </el-col>
                <el-col :span="1" :offset="21" class="u-floor">
                  <div>
                    <span v-if="commentPage.currentPage == 1">
                      <span v-if="index == 0">沙发</span>
                      <span v-else-if="index == 1">板凳</span>
                      <span v-else>{{index+commentPage.currentPage}}楼</span>
                    </span>
                    <span v-else>{{index+1+(commentPage.currentPage-1)*commentPage.pageSize}}楼</span>
                  </div>
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
                    <i>{{item.author}}</i>
                  </li>
                  <li>年级：
                    <i>{{item.grade}}</i>
                  </li>
                  <li>文章：
                    <i>{{item.article_count}}</i>
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
          <el-col :span="20" style="border-left: 1px solid #c3d9ff;">
            <div class="grid-box-content">
              <div class="ql-container ql-snow" style="height:100%;border: 0;">
                <div class="ql-editor" v-html="item.comment"></div>
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
                  <router-link :to="{name:'用户信息',params:{uid: item.uid || 0}}">查看</router-link>
                </el-col>
                <el-col :span="8">
                  <img src="../assets/img/msg.png" alt="">
                  <div class="u-send" href="#" @click="handleMessageDialog(item.uid,item.author)">发信</div>
                </el-col>
                <el-col :span="8">
                  <img src="../assets/img/add.png" alt="">
                  <div class="u-addf" @click="addFriend(item.uid)">加友</div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="grid-box-foot u-border-left">
              <el-row class="u-praise-blame">
                <el-col :span="2">
                  <img @click="submitCommentPraise(item)" src="../assets/img/praise.png" alt="" style="margin-bottom: 4px;">{{item.praise}}
                </el-col>
                <el-col :span="2">
                  <img @click="submitCommentBlame(item)" src="../assets/img/blame.png" alt="">{{item.blame}}
                </el-col>
                <el-col :span="3" :offset="17">
                  {{item.date}}
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-pagination @current-change="handleCurrentChange" :page-size="commentPage.pageSize" layout="prev, pager, next, jumper" :total="commentPage.totalCount">
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
    <el-dialog title="发送信息" :visible.sync="sendMessageDialogVisible" width="30%" :before-close="handleClose">
      <div style="margin-bottom:10px;">发送信息给
        <strong>{{this.messageForm.to}}</strong>：</div>
      <el-input type="textarea" autofocus :rows="4" v-model="messageForm.content"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sendMessageDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendMessage()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import api from "../api";
import MessageBox from "../utils/MessageBox";
const { mapActions, mapState } = createNamespacedHelpers("routeStore");
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
        author: "",
        sid: 0
      },
      replyForm: {
        comment: "",
        uid: 0,
        aid: 0,
        sid: 0,
        date: "",
        author: "",
        from_content: "",
        from_nickname: ""
      },
      messageForm: {
        from_id: "",
        to: "",
        from: "",
        content: ""
      },
      article: {},
      commentPage: {},
      dialogReplyVisible: false,
      articleDialogVisible: true,
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
        // something config
      },
      sendMessageDialogVisible: false,
      handleDeleteVisible: this.$session.get("user")
        ? this.$session.get("user").position === "系统管理员"
        : false
    };
  },
  computed: {
    ...mapState(["socket"])
  },
  created() {
    api
      .ajax("articleBySidAid/get", {
        sid: this.$route.params.sid,
        aid: this.$route.params.aid
      })
      .then(res => {
        this.article = res;
        api
          .ajax("commentPageByAid/get", { aid: res.id, currentPage: 1 })
          .then(res => {
            this.commentPage = res;
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  watch: {
    $route(to, from) {
      api
        .ajax("articleBySidAid/get", {
          sid: this.$route.params.sid,
          aid: this.$route.params.aid
        })
        .then(res => {
          this.article = res;
          api
            .ajax("commentPageByAid/get", { aid: res.id, currentPage: 1 })
            .then(res => {
              this.commentPage = res;
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
      this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
    }
  },
  beforeDestroy() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  methods: {
    ...mapActions(["setRouteList"]),
    addFriend(fid) {
      if (this.$session.get("user")) {
        api
          .ajax(
            "addFriend/post",
            { uid: this.$session.get("user").id, fid: fid },
            "post"
          )
          .then(res => {
            if (res > 0) {
              MessageBox.alert("成功", "添加成功");
            }
            if (res == -1) {
              MessageBox.alert("提示", "该好友已经添加");
            }
          });
      } else {
        MessageBox.alert("提示", "请登录后再操作");
      }
    },
    sendMessage() {
      if (this.$session.get("user")) {
        var obj = JSON.stringify(this.messageForm);
        this.socket.send(obj);
        this.sendMessageDialogVisible = false;
        this.messageForm.content = "";
      } else {
        MessageBox.alert("提示", "请登录后再操作");
      }
    },
    handleMessageDialog(uid, author) {
      if (this.$session.get("user")) {
        api
          .ajax("checkOnline/get", { id: uid })
          .then(res => {
            if (res > 0) {
              this.sendMessageDialogVisible = true;
              this.messageForm.to_id = uid;
              this.messageForm.to = author;
              this.messageForm.from_id = this.$session.get("user").id;
              this.messageForm.from = this.$session.get("user").nickname;
            } else {
              MessageBox.alert("提示", "用户不在线,无法发送消息");
            }
          })
          .catch(err => console.log(err));
      } else {
        MessageBox.alert("提示", "请登录后再操作");
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submitDeleteArticleForm(item) {
      api.delete("removeArticleById/post", { id: item.id }, this, "系统管理员");
    },
    submitDeleteCommentForm(item) {
      api.delete("removeCommentById/post", { id: item.id }, this, "系统管理员");
    },
    submitCommentPraise(item) {
      api
        .ajax("commentPraise/post", { id: item.id }, "post")
        .then(res => {
          if (res > 0) item.praise += 1;
        })
        .catch(err => console.log(err));
    },

    submitCommentBlame(item) {
      api
        .ajax("commentBlame/post", { id: item.id }, "post")
        .then(res => {
          if (res > 0) item.blame += 1;
        })
        .catch(err => console.log(err));
    },
    submitArticlePraise(item) {
      api
        .ajax("articlePraise/post", { id: item.id }, "post")
        .then(res => {
          if (res > 0) item.praise += 1;
        })
        .catch(err => console.log(err));
    },
    submitArticleBlame(item) {
      api
        .ajax("articleBlame/post", { id: item.id }, "post")
        .then(res => {
          if (res > 0) item.blame += 1;
        })
        .catch(err => console.log(err));
    },
    handleReplyDialog(fromContent, fromNickname) {
      if (this.$session.get("user")) {
        this.replyForm.date = new Date().format("yyyy-MM-dd hh:mm");
        this.replyForm.uid = this.$session.get("user").id;
        this.replyForm.author = this.$session.get("user").nickname;
        this.replyForm.from_nickname = fromNickname;
        this.replyForm.from_content =
          "<div style='background-color: #e5e7ea;border-radius: 4px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;padding: 10px;margin-bottom: 10px;border: 1px dashed #333;'>" +
          "<span style='font-weight: 900;padding-right: 5px;'>" +
          this.$session.get("user").nickname +
          "</span>" +
          "对" +
          "<span style='font-weight: 900;padding-left: 5px;padding-right: 5px;'>" +
          this.replyForm.from_nickname +
          "</span>" +
          "的以下内容:" +
          "</br>" +
          "<span style='display: inline-block;line-height: 22px;'>" +
          fromContent +
          "</span>" +
          "</br>" +
          "<span style='font-weight: 900;'>进行回复:</span>" +
          "</div>";
        this.replyForm.aid = this.$route.params.aid;
        this.replyForm.sid = this.$route.params.sid;
        this.dialogReplyVisible = true;
      } else {
        this.$alert("请登录后再操作", "提示", {
          confirmButtonText: "确定",
          callback: () => {
            this.$router.push({
              name: "登录"
            });
          }
        });
      }
    },
    submitCommentForm() {
      if (this.$session.get("user")) {
        this.commentForm.date = new Date().format("yyyy-MM-dd hh:mm");
        this.commentForm.uid = this.$session.get("user").id;
        this.commentForm.author = this.$session.get("user").nickname;
        this.commentForm.aid = this.$route.params.aid;
        this.commentForm.sid = this.$route.params.sid;
        console.log(this.commentForm);
        api.insert("addComment/post", this.commentForm, this);
      } else {
        this.$alert("请登录后再操作", "提示", {
          confirmButtonText: "确定",
          callback: () => {
            this.$router.push({
              name: "登录"
            });
          }
        });
      }
    },
    handleCurrentChange(val) {
      if (val == 1) {
        this.articleDialogVisible = true;
      } else {
        this.articleDialogVisible = false;
      }
      api
        .ajax("commentPageByAid/get", {
          aid: this.article.id,
          currentPage: val
        })
        .then(res => {
          this.commentPage = res;
        })
        .catch(err => console.log(err));
    },
    submitReplyForm() {
      this.replyForm.comment =
        this.replyForm.from_content + this.replyForm.comment;
      api.insert("addComment/post", this.replyForm, this);
    },
    submitAddStar() {
      if (this.$session.get("user")) {
        api
          .ajax(
            "addArticleStar/post",
            {
              uid: this.$session.get("user").id,
              aid: this.article.id,
              date: new Date().format("yyyy-MM-dd hh:mm")
            },
            "post"
          )
          .then(res => {
            if (res == -1) {
              MessageBox.alert("提示", "帖子已收藏");
              return;
            }
            if (res > 0) {
              MessageBox.alert("成功", "收藏成功");
            } else {
              MessageBox.alert("失败", "收藏失败");
            }
          });
      } else {
        this.$alert("请登录后再操作", "提示", {
          confirmButtonText: "确定",
          callback: () => {
            this.$router.push({
              name: "登录"
            });
          }
        });
      }
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