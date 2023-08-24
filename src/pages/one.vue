<!--
 * @Date: 2022-11-15 15:32:33
 * @LastEditors: zhangsk
 * @LastEditTime: 2023-01-11 10:25:00
 * @FilePath: \basic-demo\src\pages\one.vue
 * @Label: Do not edit
-->

<template>
  <div class="container">
    <h1>hello,World!</h1>
    <!-- 公用组件使用 -->
    <CalculateVue
      v-model:value-one="form2.valueOne"
      v-model:value-two="form2.valueTwo"
      v-model:selected="form2.selected"
      @calculate="calculateFun"
    ></CalculateVue>
    <div>{{ form.valueOne }} -{{ form.selected }} - {{ form.valueTwo }}</div>
    <div>计算结果:{{ result ? result : "-" }}</div>
    <!-- 树组件 -->
    <TreeVue :data="treeData"></TreeVue>
    <!-- 透传属性 -->
    <AttributeBoxVue
      class="woshi"
      v-bind="attributes"
      :arr="['1', '2', '3']"
    ></AttributeBoxVue>
    <!-- 插槽 -->
    <SlotBoxVue title="我是父组件传递的标题">
      <template #default="{ text }"> {{ text }}</template>
      <template #footer></template>
    </SlotBoxVue>
    <!-- 动态组件 -->
    <DynamicComponentVue
      :components-arr="componentsArr"
      :form="form"
    ></DynamicComponentVue>
  </div>
</template>
<script lang="ts" setup>
import CalculateVue from "@/components/common/Calculate.vue";
import TreeVue from "@/components/Tree/index.vue";
import AttributeBoxVue from "@/components/common/AttributeBox.vue";
import SlotBoxVue from "@/components/common/SlotBox.vue";
import DynamicComponentVue from "@/components/common/DynamicComponent.vue";

//  使用组合式函数
import useCalculateData from "./data/calculate";
import useTreeData from "./data/tree";
import useAttributeData from "./data/attribute";
import useDynamicData from "./data/dynamic";
//  计算组件
const { form2, result, calculateFun } = useCalculateData();
//  树数据
const { treeData } = useTreeData();
//  透传属性
const { attributes } = useAttributeData();
//  动态组件
const { form, componentsArr } = useDynamicData();
</script>
<style lang="scss" scoped></style>
