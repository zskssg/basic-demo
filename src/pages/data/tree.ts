/*
 * @Date: 2022-11-16 11:04:58
 * @LastEditors: zhangsk
 * @LastEditTime: 2022-11-16 11:05:25
 * @FilePath: \basic-demo\src\pages\data\tree.ts
 * @Label: Do not edit
 */

import { reactive } from "vue";

export default function useTreeData() {
  const treeData = reactive([
    {
      name: "1-1",
      key: "1-1",
      lable: "1-1",
      children: [
        {
          name: "1-1-1",
          key: "1-1-1",
          lable: "1-1-1",
          children: [],
        },
        {
          name: "1-1-2",
          key: "1-1-2",
          lable: "1-1-2",
          children: [],
        },
        {
          name: "1-1-3",
          key: "1-1-3",
          lable: "1-1-3",
          children: [],
        },
      ],
    },
    {
      name: "1-2",
      key: "1-2",
      lable: "1-2",
      children: [
        {
          name: "1-2-1",
          key: "1-2-1",
          lable: "1-2-1",
          children: [
            {
              name: "1-2-1-1",
              key: "1-2-1-1",
              lable: "1-2-1-1",
              children: null,
            },
            {
              name: "1-2-1-2",
              key: "1-2-1-2",
              lable: "1-2-1-2",
              children: [],
            },
          ],
        },
        {
          name: "1-2-2",
          key: "1-2-2",
          lable: "1-2-2",
          children: [],
        },
        {
          name: "1-2-3",
          key: "1-2-3",
          lable: "1-2-3",
          children: [],
        },
      ],
    },
  ]) as any;
  return {
    treeData
  }
}