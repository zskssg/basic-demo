/*
 * @Date: 2022-11-30 17:26:39
 * @LastEditors: zhangsk
 * @LastEditTime: 2023-08-23 14:48:17
 * @FilePath: \basic-demo\src\store\index.ts
 * @Label: Do not edit
 */
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  //  类似data
  state: () => {
    return {
      userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') as string) : undefined,
      token: 'aaxswkjaoksjdohasdh' as string | undefined,
      num: 1,
    }
  },
  //  类似计算属性
  getters: {
    getNum2: (state) => state.num * 2
  },
  // 类似methods
  actions: {
    setUserInfo(info = null) {
      this.userInfo = info || undefined
      console.log(info);

      // localStorage.setItem('userInfo', JSON.stringify(info))
    }
  },
  persist: [
    {
      paths: ['num'],
      storage: sessionStorage,
      key: 'my_num'
    },
    {
      paths: ['token'],
      key: 'token',
      storage: localStorage
    },
    {
      paths: ['userInfo'],
      key: 'token',
      storage: localStorage
    },
  ]
})

