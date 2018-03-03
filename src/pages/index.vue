<template>
  <div class="g-doc">
    <div class="g-bd">
      <div class="g-mn">
        <figure id="u-lgi-pic">
          <a href="#">
            <img src="../assets/img/May.jpg" alt="点击进入岭南园">
          </a>
        </figure>
        <el-form :model="userForm" id="userForm" status-icon :rules="rules1" ref="userForm" label-width="100px" inline>
          <el-form-item prop="username" size="mini">
            <el-input type="text" v-model="userForm.username" auto-complete="true" autofocus placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="pass" size="mini">
            <el-input type="password" v-model="userForm.pass" auto-complete="false" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="submitForm_Login('userForm')">登录</el-button>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="To_Sign">注册</el-button>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="To_Article">游客</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="m-count">
        当前总共在线人数:
        <span class="u-all">1200</span>,注册用户:
        <span class="u-user">12</span>,游客:
        <span class="u-tourist">10</span>
      </div>
    </div>
  </div>
</template>
<script>
import vHeader from "../components/header";
import qs from "querystring";
export default {
  name: "v-index",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      callback();
    };
    return {
      userForm: {
        username: "",
        pass: ""
      },
      rules1: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      },
      userid: 1
    };
  },
  components: {
    vHeader
  },
  methods: {
    submitForm_Login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push({
            name: "r-article",
            query: { userid: this.userid }
          });
          console.log(this[formName].username);
        } else {
          this.openMessageBox("请输入用户名和密码", "登录失败");
          return false;
        }
      });
    },
    To_Sign() {
      this.$router.push({
        name: "r-sign"
      });
    },
    To_Article() {
      this.$router.push({
        name: "r-article"
      });
    },
    openMessageBox(content, msg) {
      console.log("aaa");
      this.$alert(content, "错误", {
        confirmButtonText: "确定",
        callback: () => {
          this.$message({
            type: "error",
            message: msg
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/pages/index";
</style>
