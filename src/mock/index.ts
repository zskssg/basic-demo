/*
 * @Date: 2022-12-13 15:53:00
 * @LastEditors: zhangsk
 * @LastEditTime: 2023-01-16 16:34:00
 * @FilePath: \basic-demo\src\mock\index.ts
 * @Label: Do not edit
 */
import type { MockMethod } from 'vite-plugin-mock'
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const arr = [{
  url: '/api/getUsers',
  method: 'get',
  response: () => {
    return {
      code: 200,
      message: 'ok',
      data: {
        'list|10': [
          {
            id: '@guid',
            name: '@cname',
            'age|20-30': 23,
            'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师']
          }
        ],
        total: 10
      }
    }
  }
},
{
  url: '/api/login',
  method: 'post',
  response: () => {
    return {
      code: 200,
      message: 'ok',
      data: {
        name: 'zsk',
        info: {
          age: 18
        }
      }
    }
  }
},
] as MockMethod[]
export function setupMock() {
  createProdMockServer([...arr])

}

export default arr