<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-col cols="3">
      <v-card variant="flat">
        <v-card-title class="text-h3"> 404 </v-card-title>
        <v-card-text class="text-subtitle-1">
          您获取的页面不存在或是没有权限访问，请检查路径是否拼写正确。
        </v-card-text>
        <v-card-actions>
          <v-btn variant="outlined" @click="router.push('/')"> 首页 </v-btn>
          <v-btn variant="outlined" @click="router.back()"> 返回上一级 </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-img src="./NotFound.svg" height="300"></v-img>
    </v-col>
  </v-container>
</template>

<script setup lang="ts">
import router from "@/routes";
</script>

<style scoped></style>
