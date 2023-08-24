<!--
 * @Date: 2022-11-15 16:37:28
 * @LastEditors: zhangsk
 * @LastEditTime: 2022-12-13 16:25:26
 * @FilePath: \basic-demo\src\pages\detail.vue
 * @Label: Do not edit
-->
<template>
  <div class="container">我是detail</div>
  <div>
    <div>
      {{ store.userInfo }}
    </div>
    <div>userInfo:{{ userInfo }}</div>
    <div>token:{{ token }}</div>
    <div>num:{{ num }}</div>
    <button @click="change">变更</button>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted, inject } from "vue";
//  使用pinia
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
const store = useStore();
const { userInfo, token, num } = storeToRefs(store);
const message = inject("$message") as any;
const change = () => {
  store.$patch({
    num: 10,
    token: "xxx...",
  });

  message.success("asd1");
};
</script>
<style lang="scss" scoped></style>
