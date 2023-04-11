import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { App } from "vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "backStage",
    components: {
      main: () => import("../views/BackStage.vue"),
    },
    redirect: "/index",
    meta: { requiresAuth: true },
    children: [
      // 首页
      {
        path: "index",
        name: "index",
        components: {
          Content: () => import("../views/asideContent/IndexContent.vue"),
        },
      },
      // 工单
      {
        path: "order",
        name: "order",
        children: [
          // 发起工单
          {
            path: "post",
            name: "postOrder",
            components: {
              Content: () =>
                import("../views/asideContent/Order/PostContent.vue"),
            },
          },
          // 我的工单
          {
            path: "mine",
            name: "mineOrder",
            components: {
              Content: () =>
                import("../views/asideContent/Order/MineContent.vue"),
            },
          },
          // 发起工单
          {
            path: "post",
            name: "postOrder",
            components: {
              Content: () =>
                import("../views/asideContent/Order/PostContent.vue"),
            },
          },
          // 代办工单池
          {
            path: "toBeDone",
            name: "toBeDoneOrder",
            components: {
              Content: () =>
                import("../views/asideContent/Order/ToBeDoneContent.vue"),
            },
          },
          // 工单列表
          {
            path: "list",
            name: "listOrder",
            components: {
              Content: () =>
                import("../views/asideContent/Order/ListContent.vue"),
            },
          },
          // 工单设置
          {
            path: "setting",
            name: "settingOrder",
            components: {
              Content: () =>
                import("../views/asideContent/Order/SettingContent.vue"),
            },
          },
        ],
      },
      // 组织架构
      {
        path: "organization",
        name: "organization",
        components: {
          Content: () =>
            import("../views/asideContent/OrganizationContent.vue"),
        },
      },
      // 工程师日历
      {
        path: "engineerCalendar",
        name: "engineerCalendar",
        components: {
          Content: () =>
            import("../views/asideContent/EngineerCalendarContent.vue"),
        },
      },
      // 客户管理
      {
        path: "customerManagement",
        name: "customerManagement",
        components: {
          Content: () =>
            import("../views/asideContent/CustomerManagementContent.vue"),
        },
      },
      // 资产管理
      {
        path: "asset",
        name: "asset",
        children: [
          // 资产清单
          {
            path: "inventory",
            name: "inventoryAsset",
            components: {
              Content: () =>
                import(
                  "../views/asideContent/AssetManagement/InventoryContent.vue"
                ),
            },
          },
          // 资产分类
          {
            path: "catefory",
            name: "cateforyAsset",
            components: {
              Content: () =>
                import(
                  "../views/asideContent/AssetManagement/CateforyContent.vue"
                ),
            },
          },
          // 添加资产
          {
            path: "add",
            name: "addAsset",
            components: {
              Content: () =>
                import("../views/asideContent/AssetManagement/AddContent.vue"),
            },
          },
          // 分派资产
          {
            path: "assingn",
            name: "assingnAsset",
            components: {
              Content: () =>
                import(
                  "../views/asideContent/AssetManagement/AssingnContent.vue"
                ),
            },
          },
        ],
      },
      // 系统设置
      {
        path: "setting",
        name: "setting",
        components: {
          Content: () => import("../views/asideContent/SettingContent.vue"),
        },
      },
    ],
  },
  // 登录页面
  {
    path: "/login",
    name: "login",
    components: {
      main: () => import("../views/auth/LoginView.vue"),
    },
  },
  {
    // 注册页面
    path: "/register",
    name: "register",
    components: {
      main: () => import("../views/auth/RegisterView.vue"),
    },
  },
];

// 创建路由
const router = createRouter({
  // 使用历史路由
  history: createWebHistory(),
  routes, // 路由配置
});
// TODO:这个是路由守卫。启用的时候可以强制网站必须登录才能访问
// 创建路由守卫
// router.beforeEach((to, from, next) => {
//   // 获取 token 值
//   const isAuthToken = localStorage.getItem("token");
//   // 检查token是否存在 如果不存在 前往登录页面
//   if (to.meta.requiresAuth && !isAuthToken) {
//     next("/login");
//   } else {
//     next();
//   }
// });
// 封装初始化前台路由
export const initBackStageRouter = (app: App<Element>) => {
  app.use(router);
};
