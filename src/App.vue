<!--
 * @Date: 2022-10-27 11:31:17
 * @LastEditors: zhangsk
 * @LastEditTime: 2023-08-23 14:48:39
 * @FilePath: \basic-demo\src\App.vue
 * @Label: Do not edit
-->
<script setup lang="ts"></script>

<template>
  <div id="App">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts" setup></script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: all 1s ease-out;
}
.fade-leave-active {
  transition: all 1s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
