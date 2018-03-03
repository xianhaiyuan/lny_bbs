import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import index from '@/pages/index'
import sign from '@/pages/sign'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'r-default',
    beforeEnter: (to, from, next) => {
      if (!Vue.prototype.$session.get("user")) {
        next({
          name: 'r-login'
        })
      } else {
        next({
          name: 'r-index'
        });
      }
    }
  }, {
    path: '/index',
    name: 'r-index',
    component: index,
    props: true,
    children: [{
      path: 'sign',
      component: sign
    }]
  }, {
    path: '/sign',
    name: 'r-sign',
    component: sign

  }, {
    path: '/login',
    name: 'r-login',
    component: login
  }]
})
