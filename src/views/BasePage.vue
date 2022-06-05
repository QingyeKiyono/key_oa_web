<template>
  <v-toolbar app flat class="bg-white">
    <v-app-bar-nav-icon
      @click="showSideDrawer = !showSideDrawer"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>KeyOA</v-toolbar-title>
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
  </v-toolbar>
  <v-navigation-drawer v-model="showSideDrawer" app :expand-on-hover="true">
    <v-list>
      <v-list-item
        prepend-icon="mdi-account"
        :title="briefProfile.name"
        :subtitle="briefProfile.jobNumber"
        @click="gotoProfile"
      ></v-list-item>
      <v-divider></v-divider>
      <v-list :nav="true">
        <v-list-item
          v-for="navRoute in navigationRoutes"
          :key="navRoute.route"
          :prepend-icon="navRoute.icon"
          :title="navRoute.name"
          :value="navRoute.route"
          :link="true"
          :to="navRoute.route"
        ></v-list-item>
      </v-list>
    </v-list>
  </v-navigation-drawer>
  <slot></slot>
  <v-dialog v-model="showLogoutConfirm">
    <v-card>
      <v-card-text> 确定要退出登陆吗 </v-card-text>
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
import router from "@/routes";
import { jsonResRequest } from "@/utils/WebUtil";
import { removeCookie } from "typescript-cookie";
import { CookieName } from "@/common";

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
const briefProfile = ref({
  name: "芦畅",
  jobNumber: "20221390",
});

// 简要Profile信息（侧边栏第一项）被点击
let gotoProfile = () => {
  console.log("going to profile...");
};

// 侧边栏的导航路由
interface NavigationRouteRecord {
  name: String;
  route: String;
  icon?: String;
}

// 侧边栏的路由信息
const navigationRoutes = reactive<Array<NavigationRouteRecord>>([
  {
    name: "My files",
    route: "/files",
    icon: "mdi-folder",
  },
  {
    name: "Shared with me",
    route: "/share",
    icon: "mdi-account-multiple",
  },
  {
    name: "Starred",
    route: "/star",
    icon: "mdi-star",
  },
]);

onMounted(() => {
  // 这里需要获取一些后台的资源
  console.log("mounted...");
});
</script>

<style scoped></style>
