import Vue from 'vue'
export default {
  alert(title, content, errMsg) {
    Vue.prototype.$alert(content, title, {
      confirmButtonText: "确定",
      callback: () => {
        if (errMsg) {
          Vue.prototype.$message({
            type: "error",
            message: errMsg
          });
        }
      }
    });
  }
}
