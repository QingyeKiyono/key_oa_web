<template>
  <v-toolbar app flat class="bg-white">
    <v-toolbar-title>KeyOA</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="showLogoutConfirm = true">
      <span>Logout</span>
      <v-icon>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-toolbar>
  <v-navigation-drawer>123123</v-navigation-drawer>
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
import { ref } from "vue";
import router from "@/routes";
import { jsonResRequest } from "@/utils/WebUtil";
import { removeCookie } from "typescript-cookie";
import { CookieName } from "@/common";

const showLogoutConfirm = ref(false);

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
</script>

<style scoped></style>
