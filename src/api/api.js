import axios from 'axios'
import qs from 'querystring'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:8080/bbs';

//POST传参序列化
axios.interceptors.request.use((config) => {
    if(config.method  === 'post' && config.headers['Content-Type'] != 'multipart/form-data'){
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
     // _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
    if(!res.data.success){
        // _.toast(res.data.msg);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    // _.toast("网络异常", 'fail');
    return Promise.reject(error);
});

export default {
	// method不填默认get
	ajax (url, params, method, config) {
		if (method == 'post') {
			return new Promise((resolve, reject) => {
		        axios.post(url, params, config)
		            .then(response => {
		                resolve(response.data);
		            }, err => {
		                reject(err);
		            })
		            .catch((error) => {
		               reject(error)
		            })
		    })
		}else{
			return new Promise((resolve, reject) => {
		        axios.get(url, {params: params})
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
	upload (url, formData) {
		let config = {
	      headers: {
	        'Content-Type': 'multipart/form-data'
	      }
	    }
	    return new Promise((resolve, reject) =>{
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