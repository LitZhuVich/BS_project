// 存储 breadcrumb 的数据
import { defineStore } from "pinia";
import { apiResponseUser } from "../model/interface";

import ApiClient from "../request/request";
const apiClient = new ApiClient();
// 保存用户数据

// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: {}, // 在这里定义用户数据的类型
  }),
  actions: {
    async fetchUserInfo() {
      const userInfo: apiResponseUser = await apiClient.get<apiResponseUser>(
        "/user"
      );
      this.userInfo = userInfo.data;
    },
  },
});
// 保存面包屑数据
export const useBreadcrumbStore = defineStore("breadcrumb", {
  state: () => {
    return {
      // 保存面包屑数据
      list: {},
    };
  },
  actions: {
    getBreadcrumbList(route: any) {
      const { matched } = route;
      // 将没有 meta.breadcrumb 的路由数据过滤掉，再生成相应的面包屑列表，
      this.list = matched
        .filter((item: any) => item.meta && item.meta.breadcrumb)
        .map((item: any) => ({
          title: item.meta.breadcrumb[0].title,
          url: item.meta.breadcrumb[0].url,
        }));
    },
    ResertBreadcrumb() {
      this.list = [];
    },
  },
});
// 保存首页数据
export const useIndexStore = defineStore("index", {
  state: () => {
    return {
      // 首页我的表单高度
      TableHeight: 300,
    };
  },
});
