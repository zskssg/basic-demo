import { reactive, ref, watch } from "vue";

export default function useDynamicData() {
  interface component {
    name: string; //  组件名
    attrs: object; //组件属性
    key: string;
    listenEvents?: object; //  监听事件名
    content?: any; //  组件内容
  }
  const value = ref("1");
  interface stringKey {
    [key: string]: any;
  }
  interface obj extends stringKey {
    inputValue: string;
    checkedNames: Array<string>;
  }
  const form = reactive({
    inputValue: "",
    checkedNames: [],
  }) as any;
  const componentsArr: Array<component> = [
    {
      name: "input",
      key: "inputValue",
      attrs: {
        type: "text",
        placeholder: "请输入值",
        "v-model": form.inputValue,
      },
      listenEvents: {
        input: (e: any) => {
          value.value = e.target.value;
          form.inputValue = e.target.value;
        },
      },
    },
    {
      name: "input",
      key: "checkedNames",
      attrs: {
        type: "checkbox",
        value: "one",
        id: "one",
        "v-model": form.checkedNames,
      },
      listenEvents: {
        change: (e: any) => {
          CheckboxChange(e.target.value);
        },
      },
      content: {
        name: "label",
        attrs: {
          for: "one",
        },
        content: "one",
      },
    },

    {
      name: "input",
      key: "checkedNames",

      attrs: {
        type: "checkbox",
        value: "two",
        id: "two",
        "v-model": form.checkedNames,
      },
      listenEvents: {
        change: (e: any) => {
          CheckboxChange(e.target.value);
        },
      },
      content: {
        name: "label",
        attrs: {
          for: "two",
        },
        content: "two",
      },
    },

    {
      name: "input",
      key: "checkedNames",
      attrs: {
        type: "checkbox",
        value: "three",
        id: "three",
        "v-model": form.checkedNames,
      },
      listenEvents: {
        change: (e: any) => {
          CheckboxChange(e.target.value);
        },
      },
      content: {
        name: "label",
        attrs: {
          for: "three",
        },
        content: "three",
      },
    },
  ];
  watch(
    () => value.value,
    () => {
      console.log(value.value, "value改变");
    }
  );
  const CheckboxChange = (v: string) => {
    if (form.checkedNames.includes(v)) {
      form.checkedNames = form.checkedNames.filter((v2: string) => v2 !== v);
    } else {
      form.checkedNames.push(v);
    }
  };
  return {
    form,
    value,
    componentsArr
  }
}