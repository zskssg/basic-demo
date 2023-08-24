/*
 * @Date: 2022-11-16 10:58:28
 * @LastEditors: zhangsk
 * @LastEditTime: 2022-11-16 11:03:54
 * @FilePath: \basic-demo\src\pages\data\calculate.ts
 * @Label: Do not edit
 */

import { reactive, ref } from "vue";

export default function useCalculateData() {
  const form2 = reactive({
    valueOne: 0,
    selected: "+",
    valueTwo: 0,
  });
  const result = ref(0);
  //  计算
  const calculateFun = () => {
    const { selected, valueOne, valueTwo } = form2;
    switch (selected) {
      case "+":
        result.value = valueOne * 1 + valueTwo * 1;
        break;
      case "-":
        result.value = valueOne - valueTwo;
        break;
      case "*":
        result.value = valueOne * valueTwo;
        break;
      case "/":
        result.value = valueOne / valueTwo;
    }
  };
  //  返回需要的属性和方法
  return {
    form2,
    result,
    calculateFun
  }
}