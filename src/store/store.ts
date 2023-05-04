// 存储 breadcrumb 的数据
import { defineStore } from "pinia";
import type { apiResponseUser } from "../model/interface";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";

import ApiClient from "../request/request";
const apiClient = new ApiClient();
// 保存用户数据

// 第一个参数是应用程序中 store 的唯一 id
export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: {} as any, // 在这里定义用户数据的类型
    permissions: ["admin", "engineer", "customer_representative"] as string[], // 已有权限数据
  }),
  actions: {
    // 获取用户信息
    async fetchUserInfo() {
      try {
        const userInfo: apiResponseUser = await apiClient.get("/user");
        this.userInfo = userInfo!.data;
        sessionStorage.setItem("role", this.userInfo.role_name);
        console.log(this.userInfo);
      } catch (error) {
        console.log(error);
      }
    },
    // 清空用户信息
    clearUserInfo() {
      this.userInfo = {};
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
    // 获取面包屑数据
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
    // 清空面包屑
    ResertBreadcrumb() {
      this.list = {};
    },
    // 更新面包屑
    updateBreadcrumb() {
      // 监听路由变化改变数据
      onBeforeRouteUpdate((to: any, from: any, next) => {
        this.list = to.meta.breadcrumb;
        next();
      });
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
