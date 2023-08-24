/*
 * @Date: 2022-12-13 15:09:19
 * @LastEditors: zhangsk
 * @LastEditTime: 2023-01-16 16:10:27
 * @FilePath: \basic-demo\src\plugins\axios.ts
 * @Label: Do not edit
 */

import axios from 'axios'
import type { Axios } from "axios";

import { message } from 'ant-design-vue'

//  创建axios实例
const instance = axios.create({
  //  baseurl
  baseURL: '/',
  timeout: 5000,

}) as Axios

//  请求拦截
instance.interceptors.request.use((config: any) => {
  // config.headers.Authorization = '123'
  return config
}, (err) => {
  return Promise.reject(err)
})

//  响应拦截
instance.interceptors.response.use((response) => {
  const { data, status } = response
  if (status !== 200)
    message.warning(data.message)

  return data

}, (err) => {
  return Promise.reject(err)
})
export default instance