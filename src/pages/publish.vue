<template>
  <div class="publish">
    <el-input autofocus v-model="tit" placeholder="请输入帖子主题"></el-input>
    <quill-editor ref="myTextEditor" v-model="content" :config="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
    </quill-editor>
    <div>
      <el-button class="u-submit" type="primary" @click="showContent">提交
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
      <!-- <div v-html="this.content"></div> -->
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      content: "<h2>I am Example</h2>",
      editorOption: {
        // something config
      },
      tit: ""
    };
  },
  methods: {
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
  }
};
</script>

<style lang="scss" scoped>
.publish {
  padding: 20px;
}
.ql-container {
  height: 350px;
}
.u-submit {
  float: right;
  margin-top: 20px;
}
.el-input {
  width: 48%;
  margin-bottom: 16px;
}
.ql-container.ql-snow {
  height: 350px;
}
</style>