<!--
 * @Date: 2022-11-14 14:36:16
 * @LastEditors: zhangsk
 * @LastEditTime: 2022-11-14 14:38:56
 * @FilePath: \basic-demo\src\components\common\AttributeBox.vue
 * @Label: Do not edit
-->
<template>
  <div class="attribute__box1" v-bind="$attrs">
    <div>透传属性：</div>
    <div>{{ $attrs }}</div>
  </div>
  <div class="attribute__box2">
    <div>props的属性arr:</div>
    <div>{{ arr }}</div>
  </div>
  <div class="attribute__box3"></div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
defineProps({
  arr: {
    //  props的属性
    type: Array,
    default: () => [],
  },
});
</script>
<style lang="scss" scoped></style>
