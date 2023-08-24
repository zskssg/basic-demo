/*
 * @Date: 2022-10-27 11:31:17
 * @LastEditors: zhangsk
 * @LastEditTime: 2022-10-27 16:23:33
 * @FilePath: \basic-demo\.eslintrc.cjs
 * @Label: Do not edit
 */
/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/require-v-for-key": "off",
  },
};
