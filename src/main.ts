import { createApp } from "vue";
import "./GlobalStyle.scss";
import App from "./App.vue";
// 引入 后台路由文件
import { initBackStageRouter } from "./router/BackStageRouter";
const app = createApp(App);
// 初始化路由
initBackStageRouter(app);
app.mount("#app");
