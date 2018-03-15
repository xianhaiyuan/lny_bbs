<template>
  <div class="g-sign">
    <el-form :model="signForm" status-icon :rules="rules" ref="signForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username" size="small">
        <el-input type="text" v-model="signForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passwd" size="small">
        <el-input type="password" v-model="signForm.passwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname" size="small">
        <el-input type="text" v-model="signForm.nickname" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="年级" prop="grade">
        <el-select v-model="signForm.grade" placeholder="请选择你的年级">
          <el-option label="大一" value="大一"></el-option>
          <el-option label="大二" value="大二"></el-option>
          <el-option label="大三" value="大三"></el-option>
          <el-option label="大四" value="大四"></el-option>
          <el-option label="已毕业" value="已毕业"></el-option>
          <el-option label="老师" value="老师"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" size="small">
        <el-input type="text" v-model="signForm.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex" size="small">
        <el-radio-group v-model="signForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日" prop="birthday" size="small">
        <el-date-picker type="date" placeholder="选择日期" v-model="signForm.birthday" style="width: 250px;" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('signForm')">提交</el-button>
        <el-button @click="resetForm('signForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from "../api";
import MessageBox from "../utils/MessageBox";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("routeStore");
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入昵称"));
      } else {
        callback();
      }
    };
    return {
      signForm: {
        passwd: "",
        username: "",
        nickname: "",
        grade: "",
        sex: "",
        email: "",
        birthday: ""
      },
      rules: {
        passwd: [{ required: true, validator: validatePass, trigger: "blur" }],
        username: [
          { required: true, validator: validateUsername, trigger: "blur" }
        ],
        nickname: [{ required: true, validator: validatName, trigger: "blur" }],
        email: [
          { type: "email", message: "请输入正确的邮箱地址", triger: "blur" },
          { required: true, message: "请输入邮箱地址", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        birthday: [
          {
            // type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        grade: [
          { required: true, message: "请选择你的年级", trigger: "change" }
        ]
      }
    };
  },

  methods: {
    ...mapActions(["setRouteList"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          api
            .ajax("signUp/post", this[formName], "post")
            .then(
              response => {
                if (response >= 1) {
                  this.$alert("注册成功", "成功", {
                    confirmButtonText: "确定",
                    callback: () => {
                      this.$router.push({ name: "登录" });
                    }
                  });
                }
              },
              err => {
                console.log(err);
              }
            )
            .catch(err => {
              console.log(err);
            });
        } else {
          MessageBox.alert("错误", "注册失败", "请输入完整信息");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  beforeDestroy() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/sign";
</style>