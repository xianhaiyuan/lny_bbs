<template>
  <div class="g-hd">
    <el-autocomplete v-model="keyword" :fetch-suggestions="querySearchAsync" @select="handleSelect" class="u-search" size="mini" placeholder="请输入帖子关键字" @keydown.enter.native="search($event)"></el-autocomplete>
    <div class="u-right-icon">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../assets/img/icon-setting.png" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="this.$session.get('user')">
            <router-link :to="{name: '用户设置'}">用户设置 </router-link>
          </el-dropdown-item>
          <el-dropdown-item v-if="!this.$session.get('user')">
            <router-link to="/login">登录</router-link>
          </el-dropdown-item>
          <el-dropdown-item v-if="!this.$session.get('user')">
            <router-link to="/sign">注册</router-link>
          </el-dropdown-item>
          <el-dropdown-item v-if="this.$session.get('user')">
            <router-link to="/accuse">举报用户</router-link>
          </el-dropdown-item>
          <el-dropdown-item v-if="this.$session.get('user')" divided>
            <div @click="unLogin">退出登录</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import api from "../api";
import MessageBox from "../utils/MessageBox";
export default {
  data() {
    return {
      touristCount: 0,
      keyword: "",
      recommend: []
    };
  },
  methods: {
    search(event) {
      if (this.keyword != "") {
        this.$router.push({
          name: "帖子搜索",
          params: { keyword: this.keyword }
        });
      } else {
        MessageBox.alert("提示", "请输入关键字");
      }
    },
    unLogin() {
      api.update("unLogin/post", { id: this.$session.get("user").id }, this, {
        alert: false
      });
      this.$session.remove("user");
      this.$router.push({ name: "登录" });
    },
    querySearchAsync(queryString, cb) {
      var recommend = this.recommend;
      var results = queryString
        ? recommend.filter(this.createStateFilter(queryString))
        : recommend;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.title.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.$router.push({
        name: "帖子",
        params: { sid: item.sid, aid: item.id }
      });
    }
  },
  mounted() {
    api
      .ajax("searchArticlePage/get", { keyword: this.keyword, currentPage: 1 })
      .then(res => {
        res.pageData.forEach(element => {
          element.value = element.title;
        });
        this.recommend = res.pageData;
      })
      .catch(err => console.log(err));
    // this.recommend = this.loadAll();
  }
};
</script>
<style lang="scss" scoped>
$hd-color: #eeeeee;
.g-hd {
  width: 100%;
  height: 100%;
  border: {
    bottom: 1px solid #ddd;
  }
  background-color: $hd-color;
}
.u-search {
  display: flex;
  width: 300px;
  height: 100%;
  padding: 0 20px;
  align-items: center;
}
.u-right-icon {
  position: absolute;
  right: 0;
  top: 0;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.el-dropdown-link {
  display: inline-block;
}
</style>