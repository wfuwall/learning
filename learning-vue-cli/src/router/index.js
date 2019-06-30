import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('../views/Index.vue')
    },
    {
      path: '/functioncomponent',
      component: () => import('../views/FunctionComponent.vue')
    },
    {
      path: '/iviewtable',
      component: () => import('../views/IviewTable.vue')
    },
    {
      path: '/tree',
      component: () => import('../views/Tree.vue')
    },
    {
      path: '/date',
      component: () => import('../views/Date.vue')
    }
  ]
})

export default router
