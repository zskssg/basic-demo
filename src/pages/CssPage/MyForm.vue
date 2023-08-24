<!--
 * @Date: 2023-01-13 16:31:19
 * @LastEditors: zhangsk
 * @LastEditTime: 2023-01-13 16:40:45
 * @FilePath: \basic-demo\src\pages\CssPage\MyForm.vue
 * @Label: Do not edit
-->
<template>
  <div class="container">
    <a-form
      :layout="formState.layout"
      :model="formState"
      v-bind="formItemLayout"
    >
      <a-form-item label="姓名">
        <a-input
          v-model:value="formState.fieldA"
          placeholder="input placeholder"
        />
      </a-form-item>
      <a-form-item label="职位">
        <a-input
          v-model:value="formState.fieldB"
          placeholder="input placeholder"
        />
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import {
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  computed,
  onActivated,
  onDeactivated,
} from "vue";
const formState = reactive({
  layout: "horizontal",
  fieldA: "",
  fieldB: "",
});
const formItemLayout = computed(() => {
  const { layout } = formState;
  return layout === "horizontal"
    ? {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      }
    : {};
});
const buttonItemLayout = computed(() => {
  const { layout } = formState;
  return layout === "horizontal"
    ? {
        wrapperCol: {
          span: 14,
          offset: 4,
        },
      }
    : {};
});

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
  console.log(`
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
  `);
});

onDeactivated(() => {
  console.log(
    `
    // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
    `
  );
});
</script>
<style lang="scss" scoped></style>
