// 存储 breadcrumb 的数据
import { defineStore } from "pinia";

// 第一个参数是应用程序中 store 的唯一 id
export const useBreadcrumbStore = defineStore("breadcrumbs", {
  state: () => {
    return {
      // 保存面包屑数据
      list: {},
      // 首页数据
      index: {
        // 首页我的表单高度
        TableHeight: 300,
      },
    };
  },
});
