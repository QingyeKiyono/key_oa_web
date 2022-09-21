<template>
  <v-navigation-drawer v-model="showSideDrawer" app :expand-on-hover="true">
    <v-list>
      <v-list-item
        prepend-icon="mdi-account"
        :title="loginStore.name"
        :subtitle="loginStore.jobNumber"
        @click="gotoProfile"
      ></v-list-item>
      <v-divider></v-divider>
      <v-list :nav="true">
        <v-list-item
          v-for="navRoute in navigationRoutes"
          :key="navRoute.id"
          :prepend-icon="navRoute.icon"
          :title="navRoute.description"
          :value="navRoute.url"
          :link="true"
          :to="navRoute.url"
        ></v-list-item>
      </v-list>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar app flat class="bg-white">
    <v-app-bar-nav-icon
      @click="showSideDrawer = !showSideDrawer"
    ></v-app-bar-nav-icon>
    <v-app-bar-title @click="router.push('/')">KeyOA</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn>
      <v-icon>mdi-check</v-icon>
    </v-btn>
    <v-btn>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-btn @click="showLogoutConfirm = true">
      <span>退出登录</span>
      <v-icon>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-app-bar>
  <v-main app>
    <router-view></router-view>
  </v-main>
  <v-dialog v-model="showLogoutConfirm">
    <v-card>
      <v-card-text> 确定要退出登陆吗</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="showLogoutConfirm = false">取消</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="logout">确认</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { getCookie, removeCookie } from "typescript-cookie";

import router from "@/routes";
import { jsonResRequest } from "@/utils";
import { CookieName, Employee, PageRes } from "@/common";
import { useLoginStore } from "@/store";

// 是否显示侧边导航栏
const showSideDrawer = ref(true);

// 确认退出登录的对话框是否显示
const showLogoutConfirm = ref(false);

// 退出登录按钮被点击
let logout = () => {
  // 发送退出登录的请求
  jsonResRequest<void>({ url: "/logout", method: "POST" }).then((r) => {
    if (r.code !== "00000") {
      return;
    }
  });
  // 删除缓存在cookie中的token
  removeCookie(CookieName.token);
  // 重新导航到登录页面
  router.push("/login");
};

// 简要Profile信息（姓名、工号）
const loginStore = useLoginStore();

// 简要Profile信息（侧边栏第一项）被点击
let gotoProfile = () => {
  router.push(`/profile/${loginStore.loginEmployee.jobNumber}`);
};

// 侧边栏的路由信息
let navigationRoutes = reactive<Array<PageRes>>([]);

onMounted(() => {
  // 加载当前员工的个人信息
  const jobNumber = getCookie(CookieName.jobNumber)!!;
  jsonResRequest<Employee>({
    url: `/employees/${jobNumber}`,
    params: {
      current: true,
    },
  }).then((res) => {
    loginStore.setLoginEmployee(res.data);
  });

  // 加载页面资源
  jsonResRequest<Array<PageRes>>({
    url: `/pages/current`,
  }).then((res) => {
    for (const page of res.data) {
      // 将路由显示在页面上
      navigationRoutes.push(...res.data);
    }
  });
});
</script>

<style scoped></style>
