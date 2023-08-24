/*
 * @Date: 2022-10-27 11:31:17
 * @LastEditors: zhangsk
 * @LastEditTime: 2023-08-24 09:48:13
 * @FilePath: \basic-demo\src\main.ts
 * @Label: Do not edit
 */
import { createApp } from 'vue'
import App from './App.vue'
//  router
import router from './router/index'

//  自定义指令
import moveEnter from './utils/moveEnter'

//  注册 ant design vue
import antdV from 'ant-design-vue'
import { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less';

//使用axios
import axios from './plugins/axios'

//  使用pinia
import pinia from './store/pinia'

//  vue实例
const app = createApp(App)
app.use(router)
// app.use(pinia())
app.use(pinia)


app.use(antdV)
app.mount('#app')

app.directive('move-enter', moveEnter)

//  定义全局属性
app.config.globalProperties.$message = message
app.provide('$message', message)

app.config.globalProperties.$axios = axios
app.provide('$axios', axios)


import { setupMock } from '@/mock/index';
setupMock();
