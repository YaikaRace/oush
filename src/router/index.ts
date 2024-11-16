import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignUp.vue'),
    meta: {
      notAuth: true
    }
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/views/SignIn.vue'),
    meta: {
      notAuth: true
    }
  },
  {
    path: '/r/:id',
    name: 'redirect',
    component: () => import('@/views/RedirectView.vue')
  },
  {
    path: '/:pathmatch(.*)*',
    name: 'notfound',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
