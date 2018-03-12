import axios from 'axios'
import qs from 'querystring'
import MessageBox from '../utils/MessageBox'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:8080/bbs';

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
  MessageBox.alert("错误", "网络异常", "请检查服务器连接")
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
  }
}
