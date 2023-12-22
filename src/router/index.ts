import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pretvorba',
      name: 'pretvorba',
      component: () => import('../views/PretvorbaView.vue')
    },
    {
      path: '/cpe',
      name: 'cpe',
      component: () => import('../views/CPEView.vue')
    },
    {
      path: '/ieee754',
      name: 'ieee754',
      component: () => import('../views/IEEE754View.vue')
    },
    {
      path: '/amdalhov',
      name: 'amdalhov',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AmdalhovView.vue')
    }
  ]
})

export default router
