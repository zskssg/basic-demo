<!--
 * @Date: 2022-11-16 15:10:41
 * @LastEditors: zhangsk
 * @LastEditTime: 2022-11-16 16:21:31
 * @FilePath: \basic-demo\src\pages\two\index.vue
 * @Label: Do not edit
-->
<template>
  <div class="two">
    <h1>two</h1>
    <div class="main">
      <div class="div" v-move-enter:foo="'hhh'">这是一个div0</div>
      <div class="div" v-for="item of 8" v-move-enter>
        这是一个div{{ item }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
</script>
<style lang="scss" scoped>
.two {
  position: relative;

  .main {
    // display: flex;
    // justify-content: space-around;
  }
}
.div {
  display: inline-block;
  width: 200px;
  height: 400px;
  line-height: 400px;
  text-align: center;
  background-color: #fff;
  border-radius: 20px;
  border: 2px solid #eaeaea;
  cursor: pointer;
}
</style>
