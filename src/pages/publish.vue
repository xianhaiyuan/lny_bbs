<template>
  <div class="publish">
    <el-input autofocus v-model="addArticleForm.title" placeholder="请输入帖子主题"></el-input>
    <quill-editor ref="myTextEditor" v-model="addArticleForm.content" :options="editorOption">
    </quill-editor>
    <div class="u-btn">
      <el-button class="u-submit" type="primary" @click="submitAddArticleForm">提交
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
      <!-- 从数据库后读出帖子内容这样用
      <div class="ql-container ql-snow" style="height:100%;width:80%;">
        <div class="ql-editor" v-html="this.content"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import { createNamespacedHelpers } from "vuex";
import MessageBox from "../utils/MessageBox";
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
      addArticleForm: {
        title: "",
        content: "请在此处输入帖子内容...",
        uid: this.$session.get("user") ? this.$session.get("user").id : null,
        author: this.$session.get("user")
          ? this.$session.get("user").nickname
          : null,
        date: "",
        sid: this.$route.params.sid
      },
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
        // something config
      },
      tit: ""
    };
  },
  methods: {
    ...mapActions(["setRouteList"]),
    submitAddArticleForm() {
      this.addArticleForm.date = new Date().format("yyyy-MM-dd hh:mm");
      if (this.$session.get("user")) {
        api
          .ajax("addArticle/post", this.addArticleForm, "post")
          .then(res => {
            if (res > 0) {
              this.$alert("添加成功", "成功", {
                confirmButtonText: "确定",
                callback: () => {
                  this.$router.go(-1);
                }
              });
            } else {
              MessageBox.alert("失败", "添加失败");
            }
          })
          .catch(err => console.log(err));
      } else {
        MessageBox.alert("失败", "请登录后再操作");
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    }
  },
  components: {
    quillEditor
  },
  created() {
    if (!this.$session.get("user")) {
      this.$router.push({ name: "登录" });
    }
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  beforeDestroy() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  }
};
</script>

<style lang="scss" scoped>
.publish {
  padding: 20px;
}
.u-btn {
  text-align: right;
  margin-top: 35px;
}
.u-submit {
  margin-top: 20px;
}
.el-input {
  width: 48%;
  margin-bottom: 16px;
}
</style>