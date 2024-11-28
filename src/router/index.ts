import store from '@/store'
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
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/UserDashboard.vue'),
    meta: {
      requireAuth: true
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

router.beforeEach((to, _from, next) => {
  if (to.meta.notAuth && store.state.loggedIn) {
    return next({ name: 'home', replace: true })
  }
  if (to.meta.requireAuth && !store.state.loggedIn) {
    return next({ name: 'login', replace: true })
  }
  next()
})

export default router
