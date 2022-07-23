<template>
  <v-main app>
    <v-container class="d-flex justify-center align-center fill-height">
      <v-col cols="4">
        <v-card>
          <v-card-title> KeyOA 员工登录 </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Username"
                variant="outlined"
                clearable
                v-model="loginForm.jobNumber"
                :rules="roles.jobNumber"
              ></v-text-field>
              <v-text-field
                label="Password"
                variant="outlined"
                clearable
                type="password"
                v-model="loginForm.password"
                :rules="roles.password"
              ></v-text-field>
            </v-form>
            <v-row>
              <v-checkbox label="记住我" v-model="rememberMe"></v-checkbox>
              <v-btn class="v-btn--size-large" @click="login">登录</v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { getCookie, setCookie } from "typescript-cookie";

import { CookieName } from "@/common";
import router from "@/routes";
import { jsonResRequest } from "@/utils";

// 登录用到的提交内容
const loginForm = reactive({
  jobNumber: "",
  password: "",
});

// 校验的规则
const roles = {
  jobNumber: [
    (i: String) => !!i || "工号不能为空！",
    (i: String) => i.length <= 10 || "工号长度超过10！",
  ],
  password: [],
};

// 是否保存当前员工工号
const rememberMe = ref(false);

onMounted(() => {
  // 尝试加载预先存放咋cookie中的工号
  loginForm.jobNumber = getCookie(CookieName.jobNumber) || "";
});

let login = () => {
  jsonResRequest<String>({
    data: loginForm,
    url: "/login",
    method: "POST",
  }).then((r) => {
    if (r.code == "00000") {
      // 如果登陆成功，那么保存token，在后续的header中带上
      setCookie(CookieName.token, r.data.toString(), { expires: 1 });
      // 如果勾选了记住我选项，那么把工号保存30天，反之保存1天
      setCookie(CookieName.jobNumber, loginForm.jobNumber, {
        expires: rememberMe.value ? 30 : 1,
      });
      // 跳转到首页
      router.push("/");
    }
  });
};
</script>

<style scoped></style>
