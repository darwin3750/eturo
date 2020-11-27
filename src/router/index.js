import Vue from 'vue'
import Router from 'vue-router'
import { auth } from '../../firebase'

import Home from '../pages/Home'
import Profile from '../pages/Profile/'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Topic from '../pages/Topic'

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
    path: '/profile',
    name: 'Profile',
    component: Profile,
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
  {
    path: '/t/:slug',
    name: 'Topic',
    component: Topic,
    meta: {
      requiresAuth: true,
    }
  },
]

const router = new Router({
  routes,
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(routes => routes.meta.requiresAuth)
  const forbidsAuth = to.matched.some(routes => routes.meta.forbidsAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  }
  // prevent logged-in users from accessing auth pages
  else if (forbidsAuth && auth.currentUser) {
    next('/')
  } else {
    next()
  }

})

export default router