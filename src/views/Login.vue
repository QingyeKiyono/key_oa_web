<template>
  <el-row :align="align">
    <el-col :span="4" :offset="10">
      <el-form id="login-form" :model="loginForm">
        <el-form-item label="工号">
          <el-input type="text" v-model="loginForm.jobNumber" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="loginForm.password" />
        </el-form-item>
        <el-button @click="login">登录</el-button>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElRow,
  ElCol
} from "element-plus";
import { reactive } from "vue";
import request from "@/utils/WebUtil";
import { setCookie } from "typescript-cookie";
import router from "@/router";

const loginForm = reactive({
  jobNumber: "",
  password: ""
});

function login() {
  request({
    url: "/login",
    data: JSON.stringify(loginForm),
    method: "POST"
  }).then((r) => {
    setCookie("token", r.data);
    router.push("/");
  });
}

const align = "middle";
</script>

<style scoped></style>
