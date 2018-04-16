<template>
  <div class="m-userInfo">
    <el-tabs tab-position="top" style="height: 200px;">
      <el-tab-pane label="用户信息">
        <div class="userInfo">
          <el-row :gutter="20">
            <el-col :span="1">
              <div>ID</div>
            </el-col>
            <el-col :span="23">
              <div class="u-bold">{{this.userData.id}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="1">
              <div class="">头像</div>
            </el-col>
            <el-col :span="23">
              <div class="m-avatar"><img v-if="this.userData.avatar" :src="userData.avatar" alt="用户头像"></div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="1">
              <div>昵称</div>
            </el-col>
            <el-col :span="23">
              <div class="u-bold">{{this.userData.nickname}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="1">
              <div>年级</div>
            </el-col>
            <el-col :span="23">
              <div class="u-bold">{{this.userData.grade}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="1">
              <div>邮箱</div>
            </el-col>
            <el-col :span="23">
              <div class="u-bold">{{this.userData.email}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="1">
              <div>性别</div>
            </el-col>
            <el-col :span="23">
              <div class="u-bold">{{this.userData.sex}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="1">
              <div>生日</div>
            </el-col>
            <el-col :span="23">
              <div class="u-bold">{{this.userData.birthday}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="1">
              <div>文章</div>
            </el-col>
            <el-col :span="23">
              <div class="u-bold">{{this.userData.article_count}}</div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="1">
              <div>状态</div>
            </el-col>
            <el-col :span="23">
              <div v-if="userData.online==1" class="u-bold">在线</div>
              <div v-else class="u-bold">离线</div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="发表的文章">
        <div class="block">
          <el-table :data="articlePage.pageData" style="width: 100%" stripe>
            <el-table-column label="主题" width="600">
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
                <span @click="handleDelete(scope.$index, scope.row)">{{ scope.row.reply_count }}</span>
              </template>
            </el-table-column>

          </el-table>
          <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :page-size="articlePage.pageSize" layout="prev, pager, next, jumper" :total="articlePage.totalCount">
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
    return {
      userData: {},
      articlePage: {},
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
      .ajax("userById/get", { id: this.$route.params.uid })
      .then(res => {
        this.userData = res;
        api
          .ajax("articlePageByUid/get", {
            uid: this.$route.params.uid,
            currentPage: 1
          })
          .then(res => {
            this.articlePage = res;
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/userInfo";
</style>