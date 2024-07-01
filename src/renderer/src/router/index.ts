import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('../layout/Layout.vue'),
    children: [
      {
        name: 'home',
        path: '/home',
        component: () => import('../pages/home/HomePage.vue')
      },
      {
        name: 'class',
        path: '/class',
        component: () => import('../pages/class/ClassPage.vue')
      },
      {
        name: 'play',
        path: '/play',
        component: () => import('../pages/play/PlayPage.vue')
      },
      {
        name: 'detail',
        path: '/detail',
        component: () => import('../pages/detail/DetailPage.vue')
      },
      {
        name: 'doc',
        path: '/doc',
        component: () => import('../pages/define.vue')
      },
      {
        name: 'setting',
        path: '/setting',
        component: () => import('../pages/define.vue')
      }
    ]
  },
  {
    path: '/play/:id',
    component: () => import('../pages/play/PlayPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
