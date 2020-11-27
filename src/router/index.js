import Vue from 'vue'
import Router from 'vue-router'
import { auth } from '../../firebase'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

import vClickOutside from 'v-click-outside'
import inViewportDirective from 'vue-in-viewport-directive'

Vue.directive('in-viewport', inViewportDirective)
Vue.use(vClickOutside)
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      forbidsAuth: true,
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      forbidsAuth: true,
    }
  },
]

const router = new Router({
  routes,
})


router.beforeEach((to, from, next) => {
  const forbidsAuth = to.matched.some(routes => routes.meta.forbidsAuth)

  // prevent logged-in users from accessing auth pages
  if (forbidsAuth && auth.currentUser) {
    next('/')
  } else {
    next()
  }

})

export default router