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
    meta: {
      requiresAuth: true,
      permissions: ["admin", "engineer", "customer_representative"],
    },
    children: [
      // 首页
      {
        path: "index",
        name: "index",
        components: {
          Content: () => import("../views/asideContent/IndexContent.vue"),
        },
        meta: {
          breadcrumb: [{ title: "首页", url: "/index" }],
          permissions: ["admin", "engineer", "customer_representative"],
        },
      },
      // 工单
      {
        path: "order",
        name: "order",
        redirect: "/order/post",
        meta: { breadcrumb: [{ title: "工单", url: "/order" }] },
        children: [
          // 发起工单
          {
            path: "post",
            name: "postOrder",
            components: {
              Content: () =>
                import("../views/asideContent/Order/PostContent.vue"),
            },
            meta: {
              breadcrumb: [{ title: "发起工单", url: "/order/post" }],
              permissions: ["admin", "customer_representative"],
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
            meta: {
              breadcrumb: [{ title: "我的工单", url: "/order/mine" }],
              permissions: ["admin", "engineer", "customer_representative"],
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
            meta: {
              breadcrumb: [{ title: "代办工单池", url: "/order/toBeDone" }],
              permissions: ["admin", "engineer"],
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
            meta: {
              breadcrumb: [{ title: "工单列表", url: "/order/list" }],
              permissions: ["admin", "engineer"],
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
            meta: {
              breadcrumb: [{ title: "工单设置", url: "/order/setting" }],
              permissions: ["admin"],
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
        meta: {
          breadcrumb: [{ title: "组织架构", url: "/organization" }],
          permissions: ["admin"],
        },
      },
      // 工程师日历
      {
        path: "engineerCalendar",
        name: "engineerCalendar",
        components: {
          Content: () =>
            import("../views/asideContent/EngineerCalendar.vue"),
        },
        meta: {
          breadcrumb: [{ title: "工程师日历", url: "/engineerCalendar" }],
          permissions: ["admin"],
        },
      },
      // 客户管理
      {
        path: "customerManagement",
        name: "customerManagement",
        components: {
          Content: () =>
            import(
              "../views/asideContent/Customer/CustomerManagementContent.vue"
            ),
        },
        meta: {
          breadcrumb: [{ title: "客户管理", url: "/customerManagement" }],
          permissions: ["admin"],
        },
      },
      // 资产管理
      {
        path: "asset",
        name: "asset",
        redirect: "/asset/inventory",
        meta: {
          breadcrumb: [{ title: "资产", url: "/asset" }],
          permissions: ["admin"],
        },
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
            meta: {
              breadcrumb: [{ title: "资产清单", url: "/asset/inventory" }],
              permissions: ["admin"],
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
            meta: {
              breadcrumb: [{ title: "资产分类", url: "/asset/catefory" }],
              permissions: ["admin"],
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
            meta: {
              breadcrumb: [{ title: "添加资产", url: "/asset/add" }],
              permissions: ["admin"],
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
            meta: {
              breadcrumb: [{ title: "分派资产", url: "/asset/assingn" }],
              permissions: ["admin"],
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
        meta: {
          breadcrumb: [{ title: "系统设置", url: "/asset/setting" }],
          permissions: ["admin", "engineer", "customer_representative"],
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
//路由守卫。启用的时候可以强制网站必须登录才能访问
//创建路由守卫
// router.beforeEach((to, from, next) => {
//   // 获取 token 值
//   const isAuthToken = localStorage.getItem("token");
//   // 检查是否需要登录验证，如果需要但用户没有登录，则跳转到登录页
//   if (to.meta.requiresAuth && !isAuthToken) {
//     next("/login");
//     return;
//   }
//   const permissions: any = to.meta.permissions;
//   // 检查用户权限，如果没有权限则跳转到无权限访问提示页面
//   if (permissions && sessionStorage.getItem("role")) {
//     const userRole: string = sessionStorage.getItem("role")!;
//     if (!permissions.includes(userRole)) {
//       next("/index");
//       return;
//     }
//   }

//   // 如果通过验证，则进行页面跳转
//   next();
// });

// 封装初始化后台路由
export const initBackStageRouter = (app: App<Element>) => {
  app.use(router);
};
