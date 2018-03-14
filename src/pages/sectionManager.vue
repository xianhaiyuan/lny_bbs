<template>
  <div class="m-sectionManager">
    <el-tabs tab-position="top" style="height: 200px;">
      <el-tab-pane label="文章管理">
        <el-dialog title="编辑帖子" :visible.sync="dialogEditVisible">
          <div class="m-edit">
            <el-input autofocus v-model="tit" placeholder="请输入帖子主题">{{this.tit}}</el-input>
            <quill-editor ref="myTextEditor" v-model="content" :options="editorOption">
            </quill-editor>
            <div class="u-btn">
              <el-button class="u-submit" type="primary" @click="showContent">提交
                <i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </div>
          </div>
        </el-dialog>
        <div class="block">
          <el-table :data="articleData" style="width: 100%" stripe>
            <el-table-column label="主题" width="400">
              <template slot-scope="scope">
                <router-link :to="{ name:'帖子', params: { sid: 1, aid: scope.row.aid }}">{{scope.row.tit}}</router-link>
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
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column label="回复">
              <template slot-scope="scope">
                <span @click="handleDelete(scope.$index, scope.row)">{{ scope.row.commentCount }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="用户封号">
        <div class="block">
          <el-table :data="userData" style="width: 100%" stripe>
            <el-table-column label="被举报的用户" width="953">
              <template slot-scope="scope">
                <router-link :to="{ name:'检测用户', params: { uid: 1 }}">{{scope.row.username}}</router-link>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleBan(scope.$index, scope.row)">封号</el-button>
                <el-button size="mini" type="danger" @click="handleRelease(scope.$index, scope.row)">释放</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
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
      content: "<h2>I am Example</h2>",
      tit: "",
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
      },
      dialogEditVisible: false,
      userData: [
        {
          username: "李四"
        },
        {
          username: "张三"
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
      console.log(`当前页: ${val}`);
    },
    handleDelete(index, row) {
      console.log(index);
      console.log(row.aid);
    },
    handleEdit(index, row) {
      this.dialogEditVisible = true;
      this.tit = row.tit;
      console.log(index, row);
    },
    handleBan(index, row) {
      console.log(index);
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
@import "../assets/scss/pages/sectionManager";
</style>