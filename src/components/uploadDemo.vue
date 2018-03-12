<template>
	<div>
		<form>
			<input type="text" value="" v-model="id" placeholder="请输入用户名">
			<!-- <input type="text" value="" v-model="sex" placeholder="请输入性别"> -->
			<input type="file" @change="getFile($event)">
			<button @click="submitForm($event)">提交</button>
		</form>
	</div>
</template>
<script>
import qs from "querystring";
import api from "../api/api.js";
export default {
  name: "index",
  data() {
    return {
      id: "",
      // sex: '',
      picFile: ""
    };
  },
  methods: {
    getFile(event) {
      console.log(event);
      this.picFile = event.target.files[0];
    },
    submitForm(event) {
      //阻止正常地提交表单
      event.preventDefault();
      let formData = new FormData();
      formData.append("id", this.id);
      formData.append("picFile", this.picFile);
      api
        .upload("user", formData)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    console.log("aaa");
    api
      .ajax("user1", { id: 1 }, "post")
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });

    // this.$ajax({
    // 	method: 'post',
    // 	url: 'http://localhost:8080/bbs/user',
    // 	data: {
    // 		id: 1
    // 	}
    // })

    // this.$ajax.post('http://localhost:8080/bbs/user', qs.stringify({
    // 	id: 1
    // }))
    //  .then(function (response) {
    //    console.log(response.data.username);
    //  })
    //  .catch(function (response) {
    //    console.log(response);
    //  })

    // this.$ajax.get('http://localhost:8080/bbs/user', {
    // 	params: {
    // 		id: 1
    // 	}
    //  })
    //  .then(function (response) {
    //    console.log(response);
    //  })
    //  .catch(function (response) {
    //    console.log(response);
    //  });

    // $.ajax({
    // 	url: 'http://localhost:8080/bbs/user',
    // 	data: {id: 1},
    // 	contentType: "application/x-www-form-urlencoded;charset=UTF-8",
    // 	type: 'post',
    // 	success: function(data){
    // 		alert(data.username)
    // 	}
    // })
  }
};
</script>
<style>

</style>