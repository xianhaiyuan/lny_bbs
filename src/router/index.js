import Vue from 'vue'
import Router from 'vue-Router'
import login from '@/pages/login'
import root from '@/pages/root'
import sign from '@/pages/sign'
import index from '@/pages/index'
import section from '@/pages/section'
import article from '@/pages/article'
import publish from '@/pages/publish'
import userSetting from '@/pages/userSetting'
import myArticle from '@/pages/myArticle'
import myStar from '@/pages/myStar'
import accuse from '@/pages/accuse'
import sectionManager from '@/pages/sectionManager'
import checkUser from '@/pages/checkUser'
import addSection from '@/pages/addSection'
import userInfo from '@/pages/userInfo'
import userManager from '@/pages/userManager'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'root',
    component: root,
    props: true,
    redirect: '/index',
    children: [{
        name: "注册",
        path: 'sign',
        component: sign
      },
      {
        name: "首页",
        path: 'index',
        component: index
      },
      {
        name: "版面列表",
        path: "section/:sid",
        component: section
      },
      {
        name: "帖子",
        path: 'section/:sid/article/:aid',
        component: article
      },
      {
        name: "发表帖子",
        path: 'section/:sid/publish',
        component: publish
      }, {
        name: "用户设置",
        path: 'index/user/setting',
        component: userSetting
      }, {
        name: "我的帖子",
        path: 'myArticle/:uid',
        component: myArticle
      }, {
        name: "我的收藏",
        path: 'myStar/:uid',
        component: myStar
      }, {
        name: "好友",
        path: 'friend/:uid'
      }, {
        name: "举报",
        path: 'accuse',
        component: accuse
      },
      {
        name: "版块管理",
        path: 'sectionManager',
        component: sectionManager
      }, {
        name: "检测用户",
        path: 'sectionManager/checkUser/:uid',
        component: checkUser
      },
      {
        name: "版块增删",
        path: 'addSection',
        component: addSection
      },
      {
        name: "用户信息",
        path: 'userInfo/:uid',
        component: userInfo
      }, {
        name: "用户管理",
        path: "userManager",
        component: userManager
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
  } else if (to.name != '登录' && to.name != 'root') {
    routeList.push({
      "name": to.name,
      "path": to.fullPath
    });
  }
  sessionStorage.setItem("routeList", JSON.stringify(routeList))
  next()
});

export default router
