<!--
 * @Date: 2022-11-01 09:49:47
 * @LastEditors: zhangsk
 * @LastEditTime: 2022-11-11 15:59:21
 * @FilePath: \basic-demo\src\components\Tree\Tree-item.vue
 * @Label: 树结构列表
-->
<template>
  <div class="tree__item">
    <div v-for="item of dataSource">
      <div class="tree__item__content">
        <div
          class="arrow__wrapper"
          v-if="item.children && item.children.length > 0"
          @click="switchArrow(item.key)"
        >
          <div class="arrow"></div>
        </div>
        <div>
          <input
            type="checkbox"
            :value="item.name"
            :checked="isChecked(item.name)"
            @change="(e) => chooseChange(e, item)"
          />
        </div>
        <div
          :class="{ active: props.selectedArr.includes(item.name) }"
          @click="selected(item.name)"
        >
          {{ item.name }}
        </div>
      </div>

      <div v-show="props.insideExpandArr.includes(item.key)">
        <TreeItemVue
          v-if="item.children && item.children.length > 0"
          class="tree__item__child"
          :data-source="item.children"
          v-model:inside-expand-arr="childTreeData.childInsideExpandArr"
          v-model:selected-arr="childTreeData.isSelectedArr"
        >
        </TreeItemVue>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  ref,
  computed,
  watch,
  inject,
} from "vue";
import TreeItemVue from "./Tree-item.vue";
interface tree {
  name: string;
  label: string;
  key: string | number;
  children: Array<tree>;
}
const props = defineProps({
  dataSource: {
    type: Array<tree>,
    default: () => [],
  },
  //  展开项数组
  insideExpandArr: {
    type: Array<string | number>,
    default: [],
  },
  //  选中数组
  selectedArr: {
    type: Array<string>,
    default: () => [],
  },
});
const $emit = defineEmits(["update:insideExpandArr", "update:selectedArr"]);

//  组件展开项

interface treeData {
  childInsideExpandArr: Array<string | number>;
  isSelectedArr: Array<string>;
}
const childTreeData = reactive<treeData>({
  childInsideExpandArr: [...props.insideExpandArr],
  isSelectedArr: [...props.selectedArr],
});

watch(
  () => childTreeData.childInsideExpandArr,
  (value) => {
    //将最新的子value推送到父组件展开项中
    //  由于子展开项数组赋了赋组件初始值，故包含父组件所有值，有变化后直接更新即可
    $emit("update:insideExpandArr", value);
  }
);
watch(
  () => childTreeData.isSelectedArr,
  (value) => {
    //  同上
    $emit("update:selectedArr", value);
  }
);

//  箭头切换,显隐子组件函数
const switchArrow = (key: string | number) => {
  let deleteKey: string | number = "";
  if (childTreeData.childInsideExpandArr.includes(key)) {
    childTreeData.childInsideExpandArr.splice(
      childTreeData.childInsideExpandArr.findIndex((v) => v === key),
      1
    );
    deleteKey = key;
  } else {
    childTreeData.childInsideExpandArr.push(key);
  }
  //  合并去重并触发事件
  const arr = concatDuplicateRemoval(
    props.insideExpandArr,
    childTreeData.childInsideExpandArr
  );
  if (deleteKey !== "" && arr.includes(deleteKey)) {
    arr.splice(
      arr.findIndex((v) => v === deleteKey),
      1
    );
  }
  $emit("update:insideExpandArr", arr);
};
/*
  选中
*/
const selected = (name: string) => {
  let deleteKey = "";
  if (childTreeData.isSelectedArr.includes(name)) {
    //  删除
    childTreeData.isSelectedArr.splice(0, 1);
    deleteKey = name;
    // let arr = props.selectedArr.filter((item) => item !== name);
  } else {
    //  替换第一个
    childTreeData.isSelectedArr.splice(0, 1, name);
    //  默认选中一个
  }

  if (deleteKey !== "") {
    $emit("update:selectedArr", []);
    return;
  }
  $emit("update:selectedArr", [name]);
};

// 复选框
// inject(注入依赖)
const { chooseArr, changeChooseArr } = inject("chooseArr") as any;
const chooseChange = (e: any, obj: tree) => {
  if (e) {
    let value = e.target.value;
    let delArr: Array<string> = [];
    let temp: Array<string> = [];
    //  递归删除或添加
    const recursive = (children: Array<tree>, flag = false) => {
      if (!children) return false;
      if (children.length <= 0) return false;
      children.forEach((item) => {
        if (flag) {
          //  删除
          delArr.push(item.name);
        } else {
          // 添加
          temp.push(item.name);
        }
        recursive(item.children, flag);
      });
    };
    //  先判断这个item是否被选中
    let flag = false; //  默认添加
    if (chooseArr.value.includes(value)) {
      delArr.push(value);
      flag = true;
    } else {
      temp.push(value);
    }
    //  如果有子组件，选中或者取消子组件的选择状态
    if (obj.children && obj.children.length > 0) {
      recursive(obj.children, flag);
    }

    //  更新chooseArr
    if (flag) {
      //  删除
      changeChooseArr(delArr, !flag);
    } else {
      //  添加
      //  合并去重
      const resArr = concatDuplicateRemoval(chooseArr.value, temp);

      changeChooseArr(resArr, !flag);
    }
  }
};

//  是否选择
const isChecked = (name: string): boolean => {
  let flag = false;
  if (chooseArr.value.includes(name)) {
    flag = true;
  } else {
    flag = false;
  }
  return flag;
};
//  合并去重函数
const concatDuplicateRemoval = <T extends {}>(
  arr1: Array<T>,
  arr2: Array<T>
): Array<T> => {
  let arr: Array<T> = [...arr1, ...arr2];
  let temp: Array<T> = [];
  arr.forEach((item) => {
    if (temp.includes(item)) return;
    temp.push(item);
  });
  return temp;
};
</script>
<style lang="scss" scoped>
.tree__item {
  display: inline-block;
  line-height: 30px;
  margin-left: 16px;
  &__content {
    width: 80px;
    display: flex;
    align-items: center;
    margin-top: 2px;
    padding: 0 10px;
    cursor: pointer;
    .arrow__wrapper {
      height: 20px;
      height: 20px;
      margin-right: 8px;
      flex-shrink: 0;
    }
    .arrow {
      position: relative;
      top: 6px;
      left: 6px;
      width: 0;
      height: 0px;
      border-top: 4px solid #000;
      border-left: 4px solid #000;
      border-right: 4px solid transparent;
      border-bottom: 4px solid transparent;
      transform: rotate(-135deg);
    }
    .active {
      color: #fff;
      background-color: skyblue;
    }
  }
  &__child {
  }
}
</style>
