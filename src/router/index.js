import Vue from 'vue'
import Router from 'vue-Router'
import login from '@/pages/login'
import index from '@/pages/index'
import sign from '@/pages/sign'
import test from '@/pages/test'
import qs from 'querystring'
Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [{
    beforeEnter: (to, from, next) => {
      if (!Vue.prototype.$session.get("user")) {
        next({
          name: '登录'
        })
      } else {
        next();
      }
    },
    path: '/',
    name: '首页',
    component: index,
    props: true,
    children: [{
        name: "注册",
        path: 'sign',
        component: sign
      },
      {
        name: "测试",
        path: 'test',
        component: test
      }
    ]
  }, {
    path: '/login',
    name: '登录',
    component: login
  }]
})

router.beforeEach((to, from, next) => {
  var routeList = sessionStorage.getItem("routeList") ? JSON.parse(sessionStorage.getItem("routeList")) : [];
  var index = -1;
  for (var i = 0; i < routeList.length; i++) {
    if (routeList[i].name == to.name) {
      index = i;
      break;
    }
  }
  if (index !== -1) {
    //如果存在路由列表，则把之后的路由都删掉
    routeList.splice(index + 1, routeList.length - index - 1);
  } else if (to.name != '登录' && to.name != '注册') {
    routeList.push({
      "name": to.name,
      "path": to.fullPath
    });
  }
  sessionStorage.setItem("routeList", JSON.stringify(routeList))
  next()
});

export default router
