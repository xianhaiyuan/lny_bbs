import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import article from '@/pages/article'
import sign from '@/pages/sign'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'r-index',
    component: index,
    beforeEnter: (to, from, next) => {
      next();
    }
  }, {
    path: '/article',
    name: 'r-article',
    component: article,
    props: true,
    beforeEnter: (to, from, next) => {
      next();
    }
  }, {
    path: '/sign',
    name: 'r-sign',
    component: sign

  }]
})
