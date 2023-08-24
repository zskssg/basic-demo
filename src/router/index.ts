/*
 * @Date: 2022-11-15 15:13:50
 * @LastEditors: zhangsk
 * @LastEditTime: 2023-04-18 13:42:36
 * @FilePath: \basic-demo\src\router\index.ts
 * @Label: Do not edit
 */
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

//  页面组件
import Index from '@/pages/index.vue'
import Detail from '@/pages/detail.vue'
import Login from '@/pages/login/index.vue'
import Two from '@/pages/two/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/two',
    name: 'two',
    component: Two,

  },
  {
    path: '/three',
    alias: '/ones', //  访问 /ones和 /three效果一样
    children: [{
      path: '',
      component: () => import('../pages/one.vue'),
    },
    {
      path: 'detail',
      component: Detail,
    }
    ]
  },
  {
    path: '/trans',
    name: 'trans',
    component: () => import('@/pages/trans/index.vue')
  },
  {
    path: '/trans-group',
    name: 'trans-group',
    component: () => import('@/pages/trans/transGroup.vue')
  },
  {
    path: '/css',
    name: 'css',
    component: () => import('@/pages/CssPage/index.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/pages/map/index.vue')
  }

]

const router = createRouter({
  history: createWebHistory(),  //  使用类似h5的路由，有两种模式，h5路由：createWebHistory， hash路由：createWebHashHistory
  routes,
})

export default router