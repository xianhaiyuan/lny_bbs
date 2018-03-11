<template>
  <div class="m-userSetting">
    <el-form :model="settingForm" status-icon :rules="rules" ref="settingForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="头像">
        <div class="el-upload el-upload--picture-card" @click="avatar_click">
          <i v-show="!settingForm.picFile" class=" el-icon-plus"></i>
          <img v-show="settingForm.picFile" width="100%" :src="settingForm.picFile" alt="">
          <input type="file" @change="onFileChange($event)" ref="inputFile" class="el-upload__input">
        </div>
      </el-form-item>
      <el-form-item label="昵称" prop="name" size="small" required>
        <el-input type="text" v-model="settingForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="年级" prop="grade">
        <el-select v-model="settingForm.grade" placeholder="请选择你的年级">
          <el-option label="大一" value="大一"></el-option>
          <el-option label="大二" value="大二"></el-option>
          <el-option label="大三" value="大三"></el-option>
          <el-option label="大四" value="大四"></el-option>
          <el-option label="已毕业" value="已毕业"></el-option>
          <el-option label="老师" value="老师"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" size="small">
        <el-input type="text" v-model="settingForm.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex" size="small ">
        <el-radio-group v-model="settingForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="生日" prop="birthday" size="small ">
        <el-date-picker type="date" placeholder="选择日期" v-model="settingForm.birthday" style="width: 250px;" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('settingForm')">提交</el-button>
        <el-button @click="resetForm('settingForm')">重置</el-button>
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
    var validatName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入昵称"));
      } else {
        callback();
      }
    };
    return {
      settingForm: {
        name: "",
        grade: "",
        sex: "",
        email: "",
        birthday: "",
        picFile: ""
      },

      rules: {
        name: [{ validator: validatName, trigger: "blur" }],
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
  created() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  beforeDestroy() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files);
    },
    createImage(file) {
      let reader = new window.FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = e => {
        this.settingForm.picFile = e.target.result;
      };
    },
    avatar_click() {
      this.$refs.inputFile.dispatchEvent(new MouseEvent("click"));
    },
    ...mapActions(["setRouteList"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          MessageBox.alert("错误", "注册失败", "请输入完整信息");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(file);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/userSetting";
</style>