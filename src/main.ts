import { createApp } from "vue";
// 引入全局样式
import "./GlobalStyle.scss";
import App from "./App.vue";
// 引入 后台路由文件
import { initBackStageRouter } from "./router/BackStageRouter";
// 引入pinia的createPinia方法
import { createPinia } from "pinia";
const pinia = createPinia();
const app = createApp(App);
// 初始化路由
initBackStageRouter(app);
app.use(pinia);
app.mount("#app");
