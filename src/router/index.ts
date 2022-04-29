import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Login from "@/views/Login.vue";
import { getCookie } from "typescript-cookie";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: import("@/views/Index.vue"),
    meta: {
      title: "Key OA"
    }
  },
  {
    path: "/hello",
    component: import("@/components/HelloWorld.vue")
  },
  {
    path: "/login",
    component: Login,
    meta: {
      title: "登录"
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from) => {
  if (to.path != "/login") {
    // 如果不是首页的话，就检查token是否存在，如果不存在，就跳转到登录页面
    if (getCookie("token") == null) {
      router.push("/login").then();
    }
  }

  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
});

export default router;
