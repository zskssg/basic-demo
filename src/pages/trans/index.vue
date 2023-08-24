<!--
 * @Date: 2023-01-11 10:34:22
 * @LastEditors: zhangsk
 * @LastEditTime: 2023-01-11 13:58:56
 * @FilePath: \basic-demo\src\pages\trans\index.vue
 * @Label: 过渡效果
-->
<template>
  <div class="container">
    <h1>过渡效果- 内置组件Transition</h1>
    <div class="example-one">
      <button @click="show = !show">Toggle</button>

      <Transition>
        <p v-show="show">hello</p>
      </Transition>
    </div>
    <div class="example-two">
      <button @click="show2 = !show2">Toggle2</button>

      <Transition name="bounce" appear>
        <p v-if="show2" style="text-align: center">
          Hello here is some bouncy text!
        </p>
      </Transition>
    </div>
    <h2>js</h2>
    <div>
      <Transition
        appear
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @after-enter="onAfterEnter"
        @enter-cancelled="onEnterCancelled"
        @before-leave="onBeforeLeave"
        @leave="onLeave"
        @after-leave="onAfterLeave"
        @leave-cancelled="onLeaveCancelled"
      >
        <div v-show="show2">这是一个box</div>
      </Transition>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted, ref } from "vue";

const show = ref(true);
const show2 = ref(true);

// 在元素被插入到 DOM 之前被调用
// 用这个来设置元素的 "enter-from" 状态
function onBeforeEnter(el: Element) {
  console.log("在元素被插入到 DOM 之前被调用", el);
}

// 在元素被插入到 DOM 之后的下一帧被调用
// 用这个来开始进入动画
function onEnter(el: Element, done: any) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  console.log("在元素被插入到 DOM 之后的下一帧被调用", el);

  done();
}

// 当进入过渡完成时调用。
function onAfterEnter(el: Element) {
  console.log("进入过渡完成 --- onAfterEnter");
}
function onEnterCancelled(el: Element) {
  console.log("进入过渡完成 --- onEnterCancelled");
}

// 在 leave 钩子之前调用
// 大多数时候，你应该只会用到 leave 钩子
function onBeforeLeave(el: Element) {
  console.log("在 leave 钩子之前调用");
}

// 在离开过渡开始时调用
// 用这个来开始离开动画
function onLeave(el: Element, done: any) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  console.log("在离开过渡开始时调用", el);

  done();
}

// 在离开过渡完成、
// 且元素已从 DOM 中移除时调用
function onAfterLeave(el: Element) {
  console.log("在离开过渡完成、且元素已从 DOM 中移除时调用  --- onAfterLeave");
}

// 仅在 v-show 过渡中可用
function onLeaveCancelled(el: Element) {
  console.log(
    "在离开过渡完成、且元素已从 DOM 中移除时调用 仅在 v-show 过渡中可用  --- onLeaveCancelled"
  );
}
</script>
<style lang="scss" scoped>
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

// 示例2
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
