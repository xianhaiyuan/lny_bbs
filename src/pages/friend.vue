<template>
  <div class="m-myFriend">
    <div class="block">
      <el-table :data="friendPage.pageData" style="width: 100%" stripe>
        <el-table-column label="昵称" width="480">
          <template slot-scope="scope">
            <div>{{scope.row.nickname}}</div>
          </template>
        </el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.online == 1">在线</div>
            <div v-else>离线</div>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="scanProfile(scope.row.id)">查看资料</el-button>
            <el-button size="mini" type="success" @click="handleMessageDialog(scope.row.id,scope.row.nickname)">发送消息</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除好友</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="friendPage.pageSize" layout="prev, pager, next, jumper" :total="friendPage.totalCount">
      </el-pagination>
    </div>
    <el-dialog title="发送信息" :visible.sync="sendMessageDialogVisible" width="30%" :before-close="handleClose">
      <div style="margin-bottom:10px;">发送信息给
        <strong>{{this.messageForm.to}}</strong>：</div>
      <el-input type="textarea" autofocus :rows="4" v-model="messageForm.content"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sendMessageDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendMessage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import MessageBox from "../utils/MessageBox";
import api from "../api";
const { mapActions, mapState } = createNamespacedHelpers("routeStore");
export default {
  data() {
    return {
      friendPage: {},
      sendMessageDialogVisible: false,
      messageForm: {
        from_id: "",
        to: "",
        from: "",
        content: ""
      }
    };
  },
  computed: {
    ...mapState(["socket"])
  },
  created() {
    if (this.$session.get("user")) {
      api
        .ajax("friendPageByUid/get", {
          uid: this.$session.get("user").id,
          currentPage: 1
        })
        .then(res => {
          this.friendPage = res;
          console.log(res);
        });
    }
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  beforeDestroy() {
    this.setRouteList(JSON.parse(sessionStorage.getItem("routeList")));
  },
  methods: {
    ...mapActions(["setRouteList"]),
    sendMessage() {
      if (this.$session.get("user")) {
        var obj = JSON.stringify(this.messageForm);
        this.socket.send(obj);
        this.sendMessageDialogVisible = false;
        this.messageForm.content = "";
      } else {
        MessageBox.alert("提示", "请登录后再操作");
      }
    },
    handleMessageDialog(uid, nickname) {
      if (this.$session.get("user")) {
        api
          .ajax("checkOnline/get", { id: uid })
          .then(res => {
            if (res > 0) {
              this.sendMessageDialogVisible = true;
              this.messageForm.to_id = uid;
              this.messageForm.to = nickname;
              this.messageForm.from_id = this.$session.get("user").id;
              this.messageForm.from = this.$session.get("user").nickname;
            } else {
              MessageBox.alert("提示", "用户不在线,无法发送消息");
            }
          })
          .catch(err => console.log(err));
      } else {
        MessageBox.alert("提示", "请登录后再操作");
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    scanProfile(uid) {
      this.$router.push({
        name: "用户信息",
        params: {
          uid: uid
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      if (this.$session.get("user") != null) {
        api
          .ajax("friendPageByUid/get", {
            uid: this.$session.get("user").id,
            currentPage: val
          })
          .then(res => {
            this.friendPage = res;
            console.log(res);
          })
          .catch(err => console.log(err));
      }
    },
    handleDelete(fid) {
      console.log(fid);
      api.delete(
        "removeFriend/post",
        { uid: this.$session.get("user").id, fid: fid },
        this
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/pages/friend";
</style>