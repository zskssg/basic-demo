<!--
 * @Date: 2022-11-01 09:50:50
 * @LastEditors: zhangsk
 * @LastEditTime: 2023-04-18 10:44:10
 * @FilePath: \basic-demo\src\components\Tree\index.vue
 * @Label: 树结构列表
-->
<template>
  <div class="tree">
    <div>展开项：{{ treeObj.insideExpandArr }} - 长度{{ len1 }}</div>
    <div>选中项:{{ treeObj.selectArr }} - 长度{{ len2 }}</div>
    <div>选择项:{{ chooseArr }} - 长度{{ len3 }}</div>

    <TreeItemVue
      :data-source="data"
      v-model:inside-expand-arr="treeObj.insideExpandArr"
      v-model:selected-arr="treeObj.selectArr"
      v-model:choose-arr="treeObj.chooseArr"
    >
    </TreeItemVue>
  </div>
</template>
<script lang="ts" setup>
import {
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  watch,
  watchEffect,
  computed,
  ref,
  provide,
  type WatchStopHandle,
} from "vue";
import TreeItemVue from "./Tree-item.vue";
interface tree {
  name: string;
  label: string;
  key: string | number;
  children: Array<tree>;
}
const props = defineProps({
  data: {
    type: Array<tree>,
    default: () => [],
  },
  //  展开项，默认不展开
  expandArr: {
    type: Array<string | number>,
    default: [],
  },
  //  选中项
  selectArr: {
    type: Array<string>,
    default: ["1-1"],
  },
  chooseArr: {
    type: Array<string>,
    default: ["1-1"],
  },
});
const chooseArr = ref([...props.chooseArr]);

//  组件内部定义展开项
const treeObj = reactive({
  insideExpandArr: [...props.expandArr],
  selectArr: [...props.selectArr.slice(0, 1)], //  默认选中第一个
  chooseArr: [...props.chooseArr],
});
const len1 = computed(() => {
  return treeObj.insideExpandArr.length;
});
const len2 = computed(() => {
  return treeObj.selectArr.length;
});
const len3 = computed(() => {
  return chooseArr.value.length;
});
//  data中查找某项子数据
const findChildren = (
  arr: Array<tree>,
  key: string
): Array<tree> | undefined => {
  let returnV: Array<tree> | undefined = [];
  if (arr.length) {
    arr.forEach((v) => {
      if (returnV?.length) {
        return;
      }
      if (key === v.key) {
        returnV = v.children;
      }
      if (!returnV?.length && v.children && v.children.length) {
        returnV = findChildren(v.children, key);
      }
    });
  }
  return returnV;
};
let unWatch: WatchStopHandle;
unWatch = watchEffect(() => {
  console.log(treeObj, "改变了");

  let arr = findChildren(props.data, treeObj.chooseArr[0]);
  if (arr) {
    treeObj.chooseArr.push(...arr.map((item) => item.name));

    chooseArr.value.push(...arr.map((item) => item.name));
  }
  if (unWatch) unWatch();
});
//provide(提供依赖属性)
function changeChooseArr(arr: Array<string>, flag: boolean = false) {
  if (flag) {
    //  添加
    chooseArr.value.splice(0);
    arr.forEach((item) => {
      chooseArr.value.push(item);
    });
  } else {
    //  删除
    arr.forEach((item) => {
      if (chooseArr.value.includes(item)) {
        chooseArr.value.splice(
          chooseArr.value.findIndex((v) => v === item),
          1
        );
      }
    });
  }
}
provide("chooseArr", {
  chooseArr,
  changeChooseArr,
});
</script>
<style lang="scss" scoped></style>
