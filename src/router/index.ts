import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { auth } from '@/config/firebase.config'
import Swal from 'sweetalert2'

import routesGuest from './guest'
import routesAdmin from './admin'
import AdminTemplate from '@layouts/dashboard/template.vue'

import { useBreadcrumStore } from "@/store/breadcrumStore.js"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    meta:{
      requiresAuth: true,
    },
    component: AdminTemplate,
    children: [
      ...routesAdmin
    ]
  },

  ...routesGuest
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  
  if(to.matched.some(route => route.meta?.requiresAuth)){
    if(auth.currentUser) {
      next()
    } else {
      Swal.fire('ops', 'Necesitas autenticarte', 'warning')
      next({ name:'auth.login' })
    }

  } else if (to.matched.some(route => route.meta?.requiresGuest) && auth.currentUser){
    if(to.name == 'auth.login' || to.name == 'auth.register'){
      next({name: 'home'})
    }

  } else {
    next()
  }
})

router.afterEach((to, from) => {
  const breadcrum = useBreadcrumStore()
  breadcrum.updateBreadcrumbsState()
})


export default router
