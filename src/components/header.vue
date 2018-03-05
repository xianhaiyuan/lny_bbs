<template>
  <div class="g-hd">
    <el-autocomplete class="u-search" size="mini" placeholder="请输入帖子主题关键字"></el-autocomplete>
    <div class="u-right-icon">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../assets/img/icon-setting.png" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人设置</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {};
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