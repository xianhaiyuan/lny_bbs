<template>
  <div class="g-doc">
    <div class="g-bd">
      <div class="g-mn">
        <figure id="u-lgi-pic">
          <a href="#">
            <img src="../assets/img/May.jpg" alt="点击进入岭南园">
          </a>
        </figure>
        <el-form :model="userForm" id="userForm" status-icon :rules="rules" ref="userForm" label-width="100px" inline>
          <el-form-item prop="username" size="mini">
            <el-input type="text" v-model="userForm.username" auto-complete="true" autofocus placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="passwd" size="mini">
            <el-input @keydown.enter.native="login($event)" type="password" v-model="userForm.passwd" auto-complete="false" placeholder="请输入密码"></el-input>
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
        当前总共在线用戶:
        <span class="u-user">{{this.onlineCount}}</span>
      </div>
    </div>
    <div class="g-ft">
      <v-footer></v-footer>
    </div>
  </div>
</template>
<script>
import vFooter from "../components/footer";
import api from "../api";
import MessageBox from "../utils/MessageBox";
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
      onlineCount: 0,
      userForm: {
        username: "",
        passwd: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        passwd: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  created() {
    this.getOnlineCount();
  },
  components: {
    vFooter
  },
  methods: {
    getOnlineCount() {
      api
        .ajax("onlineCount/get", {})
        .then(res => {
          console.log(res);
          this.onlineCount = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    login() {
      this.submitForm_Login("userForm");
    },
    submitForm_Login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api
            .ajax("login/post", this[formName], "post")
            .then(res => {
              console.log(res);
              if (res.position == "版主") {
                api
                  .ajax("sectionByUid/get", { uid: res.id })
                  .then(res => {
                    this.$session.set("section", res);
                  })
                  .catch(err => console.log(err));
              }
              if (res) {
                this.$session.set("user", res);
                this.$router.push({
                  name: "首页"
                });
              } else {
                MessageBox.alert("失败", "登录失败,请检查用户和密码");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          MessageBox.alert("错误", "登录失败", "请输入用户名和密码");
          return false;
        }
      });
    },
    To_Sign() {
      this.$router.push({
        path: "/sign"
      });
    },
    To_Article() {
      this.$router.push({
        name: "首页"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/pages/login";
</style>
