<!--
 * @Date: 2022-11-15 16:40:43
 * @LastEditors: zhangsk
 * @LastEditTime: 2023-04-20 14:59:50
 * @FilePath: \basic-demo\src\pages\login\index.vue
 * @Label: Do not edit
-->
<template>
  <div>
    <div class="container">
      <a-button class="btn" @click="btnClick">点击请求数据</a-button>
    </div>
    <div>
      <div v-for="item of list">
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted, ref, inject } from "vue";
import { useStore } from "@/store/index";
import type { Axios } from "axios";
const axios = inject("$axios") as Axios;

//  定义数据
const store = useStore();
store.setUserInfo({
  name: "zsk",
  info: "balabala...",
} as any);

//
const list = reactive([]) as any;
const btnClick = async () => {
  try {
    list.splice(0);
    const { data } = await axios.get("/api/getUsers");

    list.push(...data.list);
  } catch (error) {
    console.log(error);
  }
};
</script>
<style lang="less" scoped></style>
