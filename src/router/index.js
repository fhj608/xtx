import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        { path: '', component: () => import('@/views/Home/index.vue') },
        {
          path: '/category/:id',
          component: () => import('@/views/Category/index.vue')
        },
        {
          path: '/category/sub/:id',
          component: () => import('@/views/SubCategory/index.vue')
        },
        {
          path: '/detail/:id',
          component: () => import('@/views/Detail/index.vue')
        },
        {
          path: '/cartlist',
          component: () => import('@/views/CartList/index.vue')
        },
        {
          path: '/checkout',
          component: () => import('@/views/CheckOut/index.vue')
        },
        {
          path: '/pay/:id',
          component: () => import('@/views/Pay/index.vue')
        }
      ]
    },
    { path: '/login', component: () => import('@/views/Login/index.vue') }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})
const authorPathList = ['/cartlist']
router.beforeEach((to) => {
  if (authorPathList.includes(to.path)) {
    const userStore = useUserStore()
    if (!userStore.userInfo.token) {
      ElMessage.warning('请先登录')
      return '/login'
    }
  }
})
export default router
