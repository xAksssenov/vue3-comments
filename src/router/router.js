import CommentPage from '@/page/CommentPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/Comments',
    component: CommentPage,
  }
]

console.log("Routes:", routes);

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router