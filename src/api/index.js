import axios from 'axios'
import qs from 'querystring'
import MessageBox from '../utils/MessageBox'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:8080/bbs';
axios.defaults.withCredentials = true;

//POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post' && config.headers['Content-Type'] != 'multipart/form-data') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  // _.toast("错误的传参", 'fail');
  MessageBox.alert("错误", "传参出错", "提交失败,请检查提交的参数")
  console.log(error)
  return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
  // if (!res.data) {
  //   MessageBox.alert("错误", "获取不到数据", "请检查服务器返回值")
  //   return Promise.reject(res);
  // }
  return res;
}, (error) => {
  MessageBox.alert("错误", "未知异常", "请检查服务器")
  console.log(error)
  return Promise.reject(error);
});

export default {
  // method不填默认get
  ajax(url, params, method) {
    if (method == 'post') {
      return new Promise((resolve, reject) => {
        axios.post(url, params)
          .then(response => {
            resolve(response.data);
          }, err => {
            reject(err);
          })
          .catch((error) => {
            reject(error)
          })
      })
    } else {
      return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
          })
          .then(response => {
            resolve(response.data)
          }, err => {
            reject(err)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }

  },
  upload(url, formData) {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return new Promise((resolve, reject) => {
      axios.post(url, formData, config)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  delete(src, params, dom, position) {
    if (dom.$session.get('user')) {
      if (position && dom.$session.get('user').position != position) {
        dom.$alert("操作失败,权限不足", "失败", {
          confirmButtonText: "确定"
        });
      } else {
        dom.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this
            .ajax(src, params, "post")
            .then(res => {
              if (res > 0) {
                dom.$alert("删除成功", "成功", {
                  confirmButtonText: "确定",
                  callback: () => {
                    dom.$router.go(0);
                  }
                });
              } else {
                this.alert("失败", "删除失败");
              }
            })
            .catch(err => console.log(err))
          dom.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          dom.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    } else {
      dom.$alert("请登录后再操作", "提示", {
        confirmButtonText: "确定",
        callback: () => {
          dom.$router.push({
            name: "登录"
          })
        }
      });
    }
  },
  insert(src, params, dom, position) {
    if (dom.$session.get('user')) {
      if (position && dom.$session.get('user').position != position) {
        dom.$alert("操作失败,权限不足", "失败", {
          confirmButtonText: "确定"
        });
      } else {
        this
          .ajax(src, params, "post")
          .then(res => {
            if (res > 0) {
              dom.$alert("添加成功", "成功", {
                confirmButtonText: "确定",
                callback: () => {
                  dom.$router.go(0);
                }
              });
            } else {
              this.alert("失败", "添加失败");
            }
          })
          .catch(err => console.log(err))
      }
    } else {
      dom.$alert("请登录后再操作", "提示", {
        confirmButtonText: "确定",
        callback: () => {
          dom.$router.push({
            name: "登录"
          })
        }
      });
    }
  },
  select(src, params, dom, position) {
    if (dom.$session.get('user')) {
      if (position && dom.$session.get('user').position != position) {
        dom.$alert("操作失败,权限不足", "失败", {
          confirmButtonText: "确定"
        });
      } else {
        this
          .ajax(src, params, "post")
          .then(res => {
            if (res > 0) {
              dom.$alert("添加成功", "成功", {
                confirmButtonText: "确定",
                callback: () => {
                  dom.$router.go(0);
                }
              });
            } else {
              this.alert("失败", "添加失败");
            }
          })
          .catch(err => console.log(err))
      }
    } else {
      dom.$alert("请登录后再操作", "提示", {
        confirmButtonText: "确定",
        callback: () => {
          dom.$router.push({
            name: "登录"
          })
        }
      });
    }
  },
  update(src, params, dom, opt, position) { //opt={alert,fresh,suc,err}
    if (dom.$session.get('user')) {
      if (position && dom.$session.get('user').position != position) {
        dom.$alert("操作失败,权限不足", "失败", {
          confirmButtonText: "确定"
        });
      } else {
        this
          .ajax(src, params, "post")
          .then(res => {
            if (res > 0) {
              if (opt.alert) {
                dom.$alert(opt.suc, "成功", {
                  confirmButtonText: "确定",
                  callback: () => {
                    if (opt.fresh)
                      dom.$router.go(0);
                  }
                });
              }
            } else {
              this.alert("失败", opt.err);
            }
          })
          .catch(err => console.log(err))
      }
    } else {
      dom.$alert("请登录后再操作", "提示", {
        confirmButtonText: "确定",
        callback: () => {
          dom.$router.push({
            name: "登录"
          })
        }
      });
    }
  }
}
