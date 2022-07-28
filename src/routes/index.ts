import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { getCookie } from "typescript-cookie";
import { CookieName } from "@/common";

import Profile from "@/views/Profile.vue";

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
