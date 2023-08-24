<!--
 * @Date: 2022-11-14 16:01:46
 * @LastEditors: zhangsk
 * @LastEditTime: 2022-11-15 10:07:52
 * @FilePath: \basic-demo\src\components\common\DynamicComponent.vue
 * @Label: Do not edit
-->
<template>
  <div class="dynamic__component">
    <h1>动态组件</h1>
    <div v-for="item of componentsArr">
      <component :is="item.name" v-bind="item.attrs" v-on="item.listenEvents">
        <template v-if="typeof item.content === 'string'">
          {{ item.content }}
        </template>
      </component>
      <component
        v-if="typeof item.content !== 'string' && item.content"
        :is="item.content.name"
        v-bind="item.content.attrs"
        >{{ item.content.content }}</component
      >
    </div>
    <div>
      <div>form值</div>
      <div v-for="(item, key) of form">{{ key }} -- {{ item }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted, ref } from "vue";
interface component {
  name: string; //  组件名
  attrs: object; //组件属性
  key: string;
  listenEvents?: object; //  监听事件名
  content?: any; //  组件内容
}
interface stringKey {
  [key: string]: any;
}
interface obj extends stringKey {
  inputValue: string;
  checkedNames: Array<string>;
}
interface Props {
  componentsArr: Array<component>;
  form: obj;
}
defineProps<Props>();
</script>
<style lang="scss" scoped></style>
