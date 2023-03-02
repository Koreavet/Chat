import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Test from '../views/Test.vue'
import  Home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/home/:id',
    name: 'home',
    component: Home
  }
  ]
  
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
