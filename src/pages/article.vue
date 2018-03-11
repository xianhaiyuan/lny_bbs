<template>
  <!-- <div class="article">this is article{{ $route.params.id }} </div>
   -->
  <div class="m-article">
    <el-dialog title="回复" :visible.sync="dialogReplyVisible">
      <div class="m-edit">
        <quill-editor ref="myTextEditor" v-model="replyOne" :options="editorOption">
        </quill-editor>
        <div class="u-btn">
          <el-button class="u-submit" type="primary">提交
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </div>
      </div>
    </el-dialog>
    <div class="m-contain">
      <el-row class="m-tit">
        <el-col :span="22">
          <div class="grid-box-tit">文章主题：</div>
        </el-col>
        <el-col :span="2">
          <div class="grid-box-tit u-star"><img src="../assets/img/star.png" alt="收藏帖子">
            <!-- <div>已收藏</div> -->
          </div>
        </el-col>
      </el-row>
      <div class="m-box">
        <el-row class="m-head">
          <el-col :span="4">
            <div class="grid-box-head m-userid">
              用户ID：123
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
                    <i>李四</i>
                  </li>
                  <li>年级：
                    <i>大二</i>
                  </li>
                  <li>文章：
                    <i>1</i>
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
          <el-col :span="20" style="border-left: 1px solid #c3d9ff;">
            <div class="grid-box-content">
              <div class="ql-container ql-snow" style="height:100%;border: 0;">
                <div class="ql-editor" v-html="this.content"></div>
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
                  <router-link :to="{name:'用户信息',params:{uid: 1}}">查看</router-link>
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
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
    </el-pagination>
    <div class="m-reply">
      <quill-editor ref="myTextEditor" v-model="reply" :options="editorOption">
      </quill-editor>
      <div class="u-btn">
        <el-button class="u-submit" type="primary" @click="showReply">回复
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
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
    showReply() {
      console.log(this.reply);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleReplyDialog() {
      console.log("aaa");
      this.dialogReplyVisible = true;
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