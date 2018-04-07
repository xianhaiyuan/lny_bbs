<template>
  <div class="g-hd">
    <el-autocomplete v-model="keyword" :fetch-suggestions="querySearchAsync" @select="handleSelect" class="u-search" size="mini" placeholder="请输入帖子主题关键字" @keydown.enter.native="search($event)"></el-autocomplete>
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
      // console.log(event);
      console.log(this.keyword);
    },
    unLogin() {
      api.update("unLogin/post", { id: this.$session.get("user").id }, this, {
        alert: false
      });
      this.$session.remove("user");
      this.$router.push({ name: "登录" });
    },
    loadAll() {
      return [
        { title: "三全鲜食（北新泾店）", id: "长宁区新渔路144号" },
        {
          title: "Hot honey 首尔炸鸡（仙霞路）",
          id: "上海市长宁区淞虹路661号"
        },
        {
          title: "新旺角茶餐厅",
          id: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { title: "泷千家(天山西路店)", id: "天山西路438号" },
        {
          title: "胖仙女纸杯蛋糕（上海凌空店）",
          id: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { title: "贡茶", id: "上海市长宁区金钟路633号" },
        {
          title: "胖仙女纸杯蛋糕（上海凌空店）",
          id: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { title: "贡茶", id: "上海市长宁区金钟路633号" },
        {
          title: "胖仙女纸杯蛋糕（上海凌空店）",
          id: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { title: "贡茶", id: "上海市长宁区金钟路633号" },
        {
          title: "胖仙女纸杯蛋糕（上海凌空店）",
          id: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { title: "贡茶", id: "上海市长宁区金钟路633号" }
      ];
    },
    querySearchAsync(queryString, cb) {
      console.log(queryString);
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
      console.log(item);
      this.$router.push({
        name: "帖子",
        params: { sid: item.sid, aid: item.id }
      });
    }
  },
  mounted() {
    api
      .ajax("searchArticlePage/get", { keyword: null, currentPage: 1 })
      .then(res => {
        res.pageData.forEach(element => {
          element.value = element.title;
        });
        this.recommend = res.pageData;
        console.log(this.recommend);
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