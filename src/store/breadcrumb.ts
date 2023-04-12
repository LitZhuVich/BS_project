// 存储 breadcrumb 的数据
import { defineStore } from "pinia";

// 第一个参数是应用程序中 store 的唯一 id
export const useBreadcrumbStore = defineStore("breadcrumbs", {
  state: () => {
    return {
      list: {},
    };
  },
});
