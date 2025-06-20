import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter(
  {
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        redirect: '/dashboard',
      },
      {
        path: '/dashboard',
        component: () => import('@/views/Dashboard.vue'),
      },
      {
        path: '/users',
        component: () => import('@/views/Users.vue'),
      },
      {
        path: '/logs',
        component: () => import('@/views/Logs.vue'),
      },
      {
        path: '/service-manager',
        component: () => import('@/views/ServiceManager.vue'),
      },
      {
        path: '/stream-tasks',
        component: () => import('@/views/StreamTasks.vue'),
      },
      {
        path: '/debug',
        component: () => import('@/views/DebugPage.vue'),
      },
      // {
      //   path: '/settings',
      //   component: () => import('@/views/Settings.vue'),
      // },
      {
        path: '/:catchAll(.*)',
        redirect: '/dashboard',
      },
    ],
  },
)

export default router
