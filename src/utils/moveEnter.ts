
/*
 * @Date: 2022-11-16 15:01:16
 * @LastEditors: zhangsk
 * @LastEditTime: 2022-12-01 14:17:30
 * @FilePath: \basic-demo\src\utils\moveEnter.ts
 * @Label: Do not edit
 */

import type { DirectiveBinding, VNode } from "vue";
let enterTime = 0
let leaveTime = 0
const moveEnter = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el: Element, binding: DirectiveBinding, vnode: VNode, prevVnode: VNode | null) {
    // 下面会介绍各个参数的细节
    console.log(el, binding, vnode, prevVnode);

  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el: any, binding: any, vnode: any, prevVnode: any) { },
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el: Element, binding: DirectiveBinding) {
    el.addEventListener('mouseenter', (e: Event) => {
      enterTime = new Date().getTime()
      //  加入全局定义的move-enter
      el.classList.add('move-enter')
    }, {
      once: true
    })
    el.addEventListener('mouseleave', (e: Event) => {
      leaveTime = new Date().getTime()
      let timer: any = null
      if ((leaveTime - enterTime) > 1000) {
        el.classList.remove('move-enter')
      } else {
        timer = setTimeout(() => {
          el.classList.remove('move-enter')
          clearTimeout(timer)
        }, 1000)
      }

    }, {
      once: true
    })

  },
  // 绑定元素的父组件更新前调用
  beforeUpdate(el: any, binding: any, vnode: any, prevVnode: any) { },
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el: any, binding: any, vnode: any, prevVnode: any) { },
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el: any, binding: any, vnode: any, prevVnode: any) {
    try {
      el.removeEventListener('mouseenter')
      el.removeEventListener('mouseleave')

    } catch (error) {
      console.log(error);

    }
  },
  // 绑定元素的父组件卸载后调用
  unmounted(el: any, binding: any, vnode: any, prevVnode: any) { }
}

export default moveEnter