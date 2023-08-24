/*
 * @Date: 2022-10-27 11:31:17
 * @LastEditors: zhangsk
 * @LastEditTime: 2023-01-16 16:33:56
 * @FilePath: \basic-demo\vite.config.ts
 * @Label: Do not edit
 */
import { fileURLToPath, URL } from 'node:url'

import { build, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

const postCssPxToRem = require('postcss-pxtorem')

//  mock

// https://vitejs.dev/config/
export default ({ command, mode }: any) => {
  //  env文件变量
  const env = loadEnv(mode, fileURLToPath(new URL('./env', import.meta.url)))
  //  是否是构建模式
  const isBuild = command === 'build'
  console.log(isBuild, mode);

  return defineConfig({
    plugins: [vue(),
    //  mock
    viteMockServe({
      mockPath: fileURLToPath(new URL('./src/mock', import.meta.url)),  //  路径
      localEnabled: true, //  开发环境是否启用
      watchFiles: true, // 监听mock文件变化
      logger: true,
      //   injectCode: `
      // import {setupMock} from './mock/index.ts';
      // setupMock();
      // `
    })],
    resolve: {
      //  别名
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      //  扩展
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    css: {
      devSourcemap: true, //  开启sourcemap
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/css/main.scss";'
        },
        less: {
          modifyVars: {
            hack: 'true; @import "@/assets/css/theme.less"',
          },
          javascriptEnabled: true,
        }
      },
      postcss: {
        plugins: [
          // px转rem插件
          // postCssPxToRem({
          //   // rootValue: 144,  //  （设计稿/10）1rem的大小
          //   propList: ['*']
          // }),
        ]
      }
    },
    //  env目录
    envDir: fileURLToPath(new URL('./env', import.meta.url)),
    // 文件根目录
    base: env.VITE_BASE_SXW ? env.VITE_BASE_SXW + '/' : '/',
    // 开发服务器
    server: {
      //  服务端口
      port: Number(env.VITE_PORT),
      //  host （不带端口）
      host: env.VITE_HOST,
      //  是否自动打开
      open: false,
      //为开发服务器配置自定义代理规则。
      proxy: {
        '/api': {
          target: '127.0.0.1:5000/',  //  意思是代理 http://localhost:4000
          changeOrigin: true,
          rewrite: (h) => h.replace(/^\/api/, '')
        }
      }
    },

    //  构建选项
    build: {
      //  输出目录，默认dist(相对于根目录)
      outDir: 'dist',
      //  指定生成静态资源的存放路径  ,,默认 assets
      assetsDir: 'assets',
      //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。 默认4096 (4kb)
      assetsInlineLimit: 4096,
      //设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'，这是指 支持原生 ES 模块、原生 ESM 动态导入 和 import.meta 的浏览器。
      //  另一个特殊值是 “esnext” —— 即假设有原生动态导入支持，并且将会转译得尽可能小,一般会搭配esbuild使用
      target: 'modules'
    },
    //  ESBuildOptions 继承自 esbuild 转换选项。
    esbuild: {
      //  最常见的用例是自定义 JSX
      jsxFactory: 'h',
      jsxFragment: 'Fragment'
    }
  })
}