<template>
  <div class="g-doc">
    <div class="g-hd">
      <v-header></v-header>
    </div>
    <div class="g-bd">
      <div class="g-mn">
        <figure id="u-lgi-pic">
          <a href="#">
            <img src="../assets/img/May.jpg" alt="点击进入岭南园">
          </a>
        </figure>
        <!-- <el-input v-model="username" placeholder="请输入用户名" class="u-username" autofocus></el-input>
        <el-input v-model="password" placeholder="请输入密码" type="password" class="u-password"></el-input>
        <el-button type="primary" @click="alert" class="u-btn">登录</el-button> -->
        <el-form :model="userForm" status-icon :rules="rules1" ref="userForm" label-width="100px" inline>
          <el-form-item prop="username">
            <el-input type="text" v-model="userForm.username" auto-complete="true" autofocus class="u-input" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input type="password" v-model="userForm.pass" auto-complete="false" class="u-input" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import vHeader from "../components/header";
// import { Button } from "element-ui";

export default {
  name: "v-index",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
    };
    return {
      userForm: {
        username: "",
        pass: ""
      },
      rules1: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  components: {
    vHeader
    // "el-button": Button
  },
  methods: {
    submitForm(formName) {
      console.log(this[formName].username);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/pages/index";
</style>
