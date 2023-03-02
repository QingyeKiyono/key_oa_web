import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { getCookie } from "typescript-cookie";
import { CookieName } from "@/common";

import Profile from "@/views/Detail/Profile.vue";

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
        component: () => import("@/views/List/Employees.vue"),
      },
      {
        path: "/pages",
        component: () => import("@/views/List/PageRes.vue"),
      },
      {
        path: "/profile/:profile",
        // 这里WebStorm不知道为什么会给出警告，所以更改一下导入方式
        // component: () => import("@/views/Profile.vue"),
        component: Profile,
        props: true,
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to) => {
  // 获取登录的token
  const token = getCookie(CookieName.token);
  if (to.path != "/login") {
    // 如果token不存在，就无法访问出登录页面以外的其他页面
    if (token == null) {
      router.push("/login").then();
    }
  } else {
    // 如果token存在，则不允许访问登录页面，防止重复登录
    if (token != null) {
      router.push("/").then();
    }
  }

  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
});

export default router;
