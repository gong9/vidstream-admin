import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter(
  {
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        component: () => import('@/views/demo.vue'),
      },
      {
        path: '/:catchAll(.*)',
        redirect: '/404',
      },
    ],
  },
)

export default router
