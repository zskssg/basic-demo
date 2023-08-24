<!--
 * @Date: 2023-01-11 14:32:55
 * @LastEditors: zhangsk
 * @LastEditTime: 2023-01-11 15:18:35
 * @FilePath: \basic-demo\src\pages\trans\transGroup.vue
 * @Label: Do not edit
-->
<template>
  <div class="container">
    <h1>TransitionGroup</h1>
    <a-input v-model:value="inputValue" placeholder="请输入" />
    <a-button @click="add">添加</a-button>
    <a-button @click="del">随机删除</a-button>
    <a-button @click="emptyHandler">置空</a-button>
    <TransitionGroup name="list" tag="ul">
      <li v-for="item in items" :key="item">
        {{ item }}
      </li>
    </TransitionGroup>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, onBeforeMount, onMounted } from "vue";
const items = reactive<Array<number | string>>([1, 2, 3]);
const inputValue = ref("123");

//  add
const add = () => {
  console.log(inputValue, inputValue.value);

  if (inputValue.value !== "") {
    items.push(inputValue.value);
    inputValue.value = "";
  }
};

// del
const del = () => {
  let randomNum = Math.floor(Math.random() * (items.length - 1));
  items.splice(randomNum, 1);
};

//  emptyHandler
const emptyHandler = () => {
  items.splice(0);
};
</script>
<style lang="scss" scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>
