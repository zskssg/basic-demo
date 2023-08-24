<!--
 * @Date: 2022-11-14 15:35:46
 * @LastEditors: zhangsk
 * @LastEditTime: 2022-11-14 15:44:27
 * @FilePath: \basic-demo\src\components\common\SlotBox.vue
 * @Label: Do not edit
-->
<template>
  <div class="slot__box">
    <h1>插槽（slot）</h1>
    <div class="main">
      <slot text="默认插槽的text">
        <div>我是插槽默认内容div</div>
        <p>我是插槽默认内容p</p>
      </slot>
    </div>
    <div class="footer">
      <slot name="footer">
        <div>我是插槽footer的div:title --{{ title }}</div>
      </slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>
<style lang="scss" scoped></style>
