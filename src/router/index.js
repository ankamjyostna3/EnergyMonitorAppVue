import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import SignUp from '@/components/SignUp.vue'
import DashboardPage from '@/components/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home
  },
  {
    path: '/signup',
    name: 'SignUpPage',
    component: SignUp
  },
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: DashboardPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router