import { createApp } from "vue";
import App from "./App.vue";

// 引入Element-Plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import router from "./router";

createApp(App).use(router).use(ElementPlus).mount("#app");
