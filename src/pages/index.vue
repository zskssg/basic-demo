<!--
 * @Date: 2022-10-27 15:46:26
 * @LastEditors: zhangsk
 * @LastEditTime: 2023-08-23 14:52:41
 * @FilePath: \basic-demo\src\pages\index.vue
 * @Label: Do not edit
-->
<template>
  <div class="container">
    <a-button @click="router.push('/login')">登录</a-button>
    <a-button @click="router.push('/trans')">vue过渡效果</a-button>
    <a-button @click="router.push('/css')">css</a-button>
    <a-button @click="router.push('/map')">百度地图</a-button>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { getStore1 } from "@/utils/index";
getStore1();
const onSearch = () => {
  console.log("123");
};
console.log(onSearch);
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 50px;
  flex-wrap: wrap;
}
</style>
