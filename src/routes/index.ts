import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { getCookie } from "typescript-cookie";
import { CookieName } from "@/common";

const routes: Array<RouteRecordRaw> = [
  {
    name: "index",
    path: "/",
    component: () => import("@/views/BasePage.vue"),
    redirect: "/main",
    children: [
      {
        path: "/main",
        component: () => import("@/views/Main.vue"),
      },
      {
        path: "/employees",
        component: () => import("@/views/Employees.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to) => {
  if (to.path != "/login") {
    // 如果不是首页的话，就检查token是否存在，如果不存在，就跳转到登录页面
    if (getCookie(CookieName.token) == null) {
      router.push("/login").then();
    }
  }

  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
});

export default router;
