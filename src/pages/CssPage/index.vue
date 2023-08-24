<!--
 * @Date: 2023-01-13 11:23:43
 * @LastEditors: zhangsk
 * @LastEditTime: 2023-01-16 14:08:04
 * @FilePath: \basic-demo\src\pages\CssPage\index.vue
 * @Label: Do not edit
-->
<template>
  <div class="container">
    <div class="text__box one">这是一个打字机效果1！！！</div>
    <div class="text__box two">这是一个打字机效果2！！！</div>
    <div class="text__box three">这是一个打字机效果3！！！</div>
    <div class="text__box four">这是一个打字机效果4！！！</div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRefs, onBeforeMount, onMounted, computed } from "vue";
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  margin-top: 100px;
  margin-left: 100px;
}

.text__box {
  position: relative;
  overflow: hidden;
  width: 0;
  font-size: 32px;
  line-height: 34px;
  font-family: "Courier New", Courier, monospace;
  white-space: nowrap;
  animation: width 2s steps(13) forwards;
  &::after {
    content: "";
    position: absolute;
    right: 0px;
    height: 32px;
    border-right: 1px solid #000;
    animation: showInfinite 0.5s 5 both;
  }
}
.one {
  animation-delay: 0s;
}
.two {
  animation-delay: 2s;
  &::after {
    animation-delay: 2s;
  }
}
.three {
  animation-delay: 4s;
  &::after {
    animation-delay: 4s;
  }
}
.four {
  animation-delay: 6s;
  &::after {
    animation-delay: 6s;
    animation: showInfinite 0.5s infinite both;
  }
}

@keyframes width {
  0% {
    width: 0;
  }
  100% {
    width: 13em; //  单位em,表示一个字体的宽度
  }
}
@keyframes showInfinite {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
