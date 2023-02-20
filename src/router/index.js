import { createRouter, createWebHistory } from 'vue-router'
import Welcome from "@/views/Welcome.vue";
import Chatroom from "@/views/Chatroom.vue";
import {authorize} from "@/firebase/config";

const requireAuth = (to,from,next) => {
  let user = authorize.currentUser
  if (!user){ next({name: 'welcome'}) }
  else { next() }
}

const requireNoAuth = (to,from,next) => {
  let user = authorize.currentUser
  if (user) { next({name: 'chatroom'}) }
  else { next() }
}

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome,
    beforeEnter: requireNoAuth
  },
  {
    path: '/chatroom',
    name: 'chatroom',
    component: Chatroom,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
