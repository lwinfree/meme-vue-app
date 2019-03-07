import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PetsIndex from './views/PetsIndex.vue'
import PetShow from './views/PetShow.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import UserShow from './views/UserShow.vue'
import UserEdit from './views/UserEdit.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/pets',
      name: 'pets-index',
      component: PetsIndex
    },
    {
      path: '/pets/:id',
      name: 'pet-show',
      component: PetShow
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/users/me',
      name: 'users-show',
      component: UserShow
    },
    {
      path: '/users/me/edit',
      name: 'users-edit',
      component: UserEdit
    }
  ]
})
