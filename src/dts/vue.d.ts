/*
 * @Date: 2022-10-27 14:33:57
 * @LastEditors: zhangsk
 * @LastEditTime: 2022-10-27 15:27:50
 * @FilePath: \basic-demo\src\dts\vue.d.ts
 * @Label: Do not edit
 */

declare module "*.vue" {
  import { defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}