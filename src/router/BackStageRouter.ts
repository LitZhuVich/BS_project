import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { App } from "vue";

const routes: RouteRecordRaw[] = [
  // 首页
  {
    path: "/",
    name: "index",
    components: {
      main: () => import("../views/BackStage.vue"),
    },
    meta: { requiresAuth: true },
  },
  // 登录页面
  {
    path: "/login",
    name: "login",
    components: {
      main: () => import("../views/LoginView.vue"),
    },
  },
  {
    // 注册页面
    path: "/register",
    name: "register",
    components: {
      main: () => import("../views/RegisterView.vue"),
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
router.beforeEach((to, from, next) => {
  // 获取 token 值
  const isAuthToken = localStorage.getItem("token");
  // 检查token是否存在 如果不存在 前往登录页面
  if (to.meta.requiresAuth && !isAuthToken) {
    next("/login");
  } else {
    next();
  }
});
// 封装初始化前台路由
export const initBackStageRouter = (app: App<Element>) => {
  app.use(router);
};
