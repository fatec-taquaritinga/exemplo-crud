import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App.vue'

Vue.use(VueResource)
// process.env.API_URL = 'http://localhost:7000/api'

Vue.use(VueRouter)

const router = new VueRouter({
  history: true
})

router.map({
  '*': {
    component: resolve => require(['./components/Principal.vue'], resolve)
  },
  '/sites': {
    component: resolve => require(['./components/SitesListar.vue'], resolve)
  },
  '/sites/incluir': {
    component: resolve => require(['./components/SitesEditar.vue'], resolve)
  },
  '/sites/editar/:id': {
    component: resolve => require(['./components/SitesEditar.vue'], resolve)
  },
  '/jogos': {
    component: resolve => require(['./components/JogosListar.vue'], resolve)
  },
  '/jogos/incluir': {
    component: resolve => require(['./components/JogosEditar.vue'], resolve)
  },
  '/jogos/editar/:id': {
    component: resolve => require(['./components/JogosEditar.vue'], resolve)
  }
})

router.start(App, 'app')
