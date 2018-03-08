<template>
  <div class="publish">
    <el-input autofocus v-model="tit" placeholder="请输入帖子主题"></el-input>
    <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
    </quill-editor>
    <div class="u-btn">
      <el-button class="u-submit" type="primary" @click="showContent">提交
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
      content: "<h2>I am Example</h2>",
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
    onEditorBlur(editor) {
      // console.log("editor blur!", editor.container.innerHTML);
      console.log("editor blur!", editor.getContents());
    },
    onEditorFocus(editor) {
      console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    },
    onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.content = html;
      console.log(html);
    },
    showContent() {
      console.log(this.content);
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
}
.u-submit {
  margin-top: 20px;
}
.el-input {
  width: 48%;
  margin-bottom: 16px;
}
</style>