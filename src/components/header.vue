<template>
  <div class="g-hd">
    <el-autocomplete v-model="keyword" :fetch-suggestions="querySearchAsync" @select="handleSelect" class="u-search" size="mini" placeholder="请输入帖子关键字" @keydown.enter.native="search($event)"></el-autocomplete>
    <div class="u-right-icon">
      <span class="u-msg">
        <img v-if="this.new_msg=='true'" @click="openMsg" src='../assets/img/icon-newMsg.png' alt="">
        <img v-else @click="openMsg" src='../assets/img/icon-msg.png' alt="">
      </span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../assets/img/icon-setting.png" alt="">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="this.$session.get('user')">
            <router-link :to="{name: '用户设置'}">用户设置 </router-link>
          </el-dropdown-item>
          <el-dropdown-item v-if="!this.$session.get('user')">
            <router-link to="/login">登录</router-link>
          </el-dropdown-item>
          <el-dropdown-item v-if="!this.$session.get('user')">
            <router-link to="/sign">注册</router-link>
          </el-dropdown-item>
          <el-dropdown-item v-if="this.$session.get('user')">
            <router-link to="/accuse">举报用户</router-link>
          </el-dropdown-item>
          <el-dropdown-item v-if="this.$session.get('user')" divided>
            <div @click="unLogin">退出登录</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="信息" :visible.sync="MessageDialogVisible" width="30%" :before-close="handleClose">
      <div style="margin-bottom:10px;">
        <strong v-if="msg">{{this.msg.from}}</strong>的来信</div>
      <div v-if="msg" class="u-msgbox">{{this.msg.content}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="MessageDialogVisible = false">确 定</el-button>
        <el-button type="primary" @click="handleSendMessageDialog(msg.from_id,msg.from)">回 复</el-button>
      </span>
    </el-dialog>
    <el-dialog title="发送信息" :visible.sync="sendMessageDialogVisible" width="30%" :before-close="handleClose">
      <div style="margin-bottom:10px;" v-if="msg">发送信息给
        <strong>{{this.msg.from}}</strong>：</div>
      <el-input type="textarea" autofocus :rows="4" v-model="messageForm.content"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sendMessageDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendMessage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from "../api";
import MessageBox from "../utils/MessageBox";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("routeStore");
export default {
  data() {
    return {
      touristCount: 0,
      keyword: "",
      recommend: [],
      new_msg: "false",
      MessageDialogVisible: false,
      sendMessageDialogVisible: false,
      messageForm: {
        from_id: "",
        to: "",
        from: "",
        content: ""
      },
      msg: {
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
  methods: {
    ...mapActions(["setRouteList", "setSocket"]),
    sendMessage() {
      if (this.$session.get("user")) {
        var obj = JSON.stringify(this.messageForm);
        this.socket.send(obj);
        this.sendMessageDialogVisible = false;
        this.messageForm.content = "";
      }
    },
    handleSendMessageDialog(uid, author) {
      api
        .ajax("checkOnline/get", { id: uid })
        .then(res => {
          if (res > 0) {
            this.sendMessageDialogVisible = true;
            this.messageForm.to_id = uid;
            this.messageForm.to = author;
            this.messageForm.from_id = this.$session.get("user").id;
            this.messageForm.from = this.$session.get("user").nickname;
          } else {
            MessageBox.alert("提示", "用户不在线,无法发送消息");
          }
        })
        .catch(err => console.log(err));
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    search(event) {
      if (this.keyword != "") {
        this.$router.push({
          name: "帖子搜索",
          params: { keyword: this.keyword }
        });
      } else {
        MessageBox.alert("提示", "请输入关键字");
      }
    },
    unLogin() {
      api.update("unLogin/post", { id: this.$session.get("user").id }, this, {
        alert: false
      });
      this.$session.clear();
      this.$router.push({ name: "登录" });
    },
    querySearchAsync(queryString, cb) {
      var recommend = this.recommend;
      var results = queryString
        ? recommend.filter(this.createStateFilter(queryString))
        : recommend;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.title.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.$router.push({
        name: "帖子",
        params: { sid: item.sid, aid: item.id }
      });
    },
    openMsg() {
      let list = this.$session.get("msgList");
      if (list) {
        let msg = list.shift();
        this.$session.set("msgList", list);
        if (msg) {
          this.MessageDialogVisible = true;
          this.msg = msg;
        }
        if (list.length == 0) {
          this.$session.set("new_msg", "false");
          this.new_msg = "false";
        }
      } else {
        MessageBox.alert("提示", "暂时没有信息");
      }
    }
  },
  mounted() {
    this.new_msg = this.$session.get("new_msg") || "false";
    if (this.$session.get("user")) {
      var socket = new WebSocket("ws://localhost:8080/bbs/websocket");
      var _this = this;
      socket.onmessage = function(ev) {
        if (_this.$session.get("user")) {
          var obj = eval("(" + ev.data + ")");
          if (obj.to_id == _this.$session.get("user").id && obj.content != "") {
            _this.new_msg = "true";
            _this.$session.set("new_msg", "true");
            var msgList = _this.$session.get("msgList")
              ? _this.$session.get("msgList")
              : [];
            msgList.push(obj);
            _this.$session.set("msgList", msgList);
          }
        }
      };
    }
    this.setSocket(socket);
    api
      .ajax("searchArticlePage/get", { keyword: this.keyword, currentPage: 1 })
      .then(res => {
        if (res.pageData) {
          res.pageData.forEach(element => {
            element.value = element.title;
          });
        }
        this.recommend = res.pageData;
      })
      .catch(err => console.log(err));
  }
};
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
.u-msg {
  margin-right: 15px;
  &:hover {
    cursor: pointer;
  }
}
.u-msgbox {
  border: 1px solid #ccc;
  height: 100px;
  overflow-y: auto;
  text-indent: 1rem;
  padding: {
    top: 5px;
    left: 5px;
  }
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