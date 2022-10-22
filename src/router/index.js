import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard'
    },
    path: '/',
    name: 'home',
    component: Home
  },
  {
  	path: '/DPT',
  	name: 'DPT',
  	component: () => import('@/views/DPT.vue')
  },
  {
     path: '/newUser',
     name: 'tambahPemilih',
     component: () => import('@/views/NewUser.vue')
  },
  {
     path: '/candidates',
     name: 'kandidat',
     component: () => import('@/views/Candidates.vue')
  },
  {
  	path: '/newCandidate',
  	name: 'tambahPaslon',
  	component: () => import('@/views/NewCandidate.vue')
  },
  {
     path: '/event',
     name: 'kelolaAcara',
     component: () => import('@/views/Event.vue')
  },
  {
     meta: {
        fullScreen: true
     },
     path: '/login',
     name: 'login',
     component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router
