<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-col cols="4">
      <v-card>
        <v-card-title> KeyOA 员工登录 </v-card-title>
        <v-card-text>
          <v-form :model="loginForm">
            <v-text-field
              label="Username"
              variant="outlined"
              clearable
              v-model="loginForm.jobNumber"
            ></v-text-field>
            <v-text-field
              label="Password"
              variant="outlined"
              clearable
              type="password"
              v-model="loginForm.password"
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
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { jsonResRequest } from "@/utils/WebUtil";
import { setCookie } from "typescript-cookie";

const loginForm = reactive({
  jobNumber: "",
  password: "",
});

const rememberMe = ref(false);

let login = () => {
  jsonResRequest<String>({
    data: loginForm,
    url: "/login",
    method: "POST",
  }).then((r) => {
    if (r.code == "00000") {
      setCookie("", r.data.toString());
      if (rememberMe.value) {
        alert(111);
      }
    }
  });
};
</script>

<style scoped></style>
