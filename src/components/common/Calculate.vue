<!--
 * @Date: 2022-10-27 15:33:33
 * @LastEditors: zhangsk
 * @LastEditTime: 2022-10-27 17:33:37
 * @FilePath: \basic-demo\src\components\common\Calculate.vue
 * @Label: Do not edit
-->
<template>
  <div class="calculate">
    <h1>计算吧！公用组件</h1>
    <div class="calculate_main">
      <div>
        <input
          class="input"
          type="number"
          :value="valueOne"
          @input="(event) => emit('update:valueOne', event)"
        />
      </div>
      <div>
        <select
          class="input"
          style="text-align: center; height: 25px"
          :value="selected"
          @change="(event) => emit('update:selected', event)"
        >
          <option v-for="item of calculationSymbolList" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </div>
      <div>
        <input
          class="input"
          type="number"
          :value="valueTwo"
          @input="(event) => emit('update:valueTwo', event)"
        />
      </div>
      <div>
        <button class="button" @click="calculateClick">计算</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
//  定义可传入变量
const props = defineProps({
  // 第一个值
  valueOne: {
    type: Number,
    default: 0,
  },
  //  第二个值
  valueTwo: {
    type: Number,
    default: 0,
  },
  selected: {
    type: String,
  },
});
//  定义外调事件
const $emit = defineEmits([
  "update:valueOne",
  "update:valueTwo",
  "update:selected",
  "calculate",
]);
//  计算方式
const calculationSymbolList = [
  {
    id: 0,
    label: "➕",
    value: "+",
  },
  {
    id: 1,
    label: "➖",
    value: "-",
  },
  {
    id: 2,
    label: "✖",
    value: "*",
  },
  {
    id: 4,
    label: "➗",
    value: "/",
  },
];

// emit方法

const emit = (
  ename: "update:valueOne" | "update:valueTwo" | "update:selected",
  event: any
) => {
  if (event.target) $emit(ename, event.target.value);
};
//
const calculateClick = () => {
  //  先校验
  const { selected, valueOne } = props;
  if (selected === "/" && valueOne == 0) {
    alert("除法被除数不能为0");
    return false;
  }

  $emit("calculate");
};
</script>
<style lang="scss" scoped>
.calculate {
  width: 100%;
  position: relative;
}
.calculate_main {
  display: flex;
  justify-content: space-evenly;
  max-width: 450px;
  padding: 30px 0;
  border: thick double #000;
}
.input {
  width: 100px;
  height: 20px;
  outline: none;
  border: 1px solid #eaeaea;
  border-radius: 5px;
}
.button {
  width: 60px;
  padding: 3px 8px;
  background-color: rgb(46, 197, 92);
  color: #fff;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgb(27, 133, 58);
  }
}
</style>
