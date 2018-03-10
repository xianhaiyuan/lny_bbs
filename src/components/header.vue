<template>
  <div class="g-hd">
    <el-autocomplete class="u-search" size="mini" placeholder="请输入帖子主题关键字"></el-autocomplete>
    <div class="u-right-icon">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../assets/img/icon-setting.png" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="user">
            <router-link :to="{name: '用户设置',params: {uid: 1}}">用户设置 </router-link>
          </el-dropdown-item>
          <el-dropdown-item v-if="!user">
            <router-link to="/login">登录</router-link>
          </el-dropdown-item>
          <el-dropdown-item v-if="!user">
            <router-link to="/sign">注册</router-link>
          </el-dropdown-item>
          <el-dropdown-item v-if="user">
            <router-link to="/accuse">举报用户</router-link>
          </el-dropdown-item>
          <el-dropdown-item v-if="user" divided>
            <div @click="unLogin">退出登录</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: this.$session.get("user")
    };
  },
  methods: {
    unLogin() {
      this.$session.remove("user");
      this.user = null;
      console.log(this.$session.get("user"));
    }
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