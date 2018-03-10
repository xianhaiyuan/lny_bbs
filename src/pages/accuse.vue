<template>
  <div class="m-accuse">
    <el-form :model="accuseForm" status-icon :rules="rules" ref="accuseForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户ID" prop="userid">
        <el-input type="text" v-model="accuseForm.userid" auto-complete="off" placeholder="请输入要举报的用户ID" autofocus></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('accuseForm')">提交</el-button>
        <el-button @click="resetForm('accuseForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MessageBox from "../utils/MessageBox";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("routeStore");
export default {
  data() {
    var validateUserid = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户ID"));
      } else {
        callback();
      }
    };
    return {
      accuseForm: {
        userid: ""
      },
      rules: {
        userid: [{ validator: validateUserid, trigger: "blur" }]
      }
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/accuse";
</style>