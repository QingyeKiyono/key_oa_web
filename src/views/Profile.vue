<template>
  <v-container>
    <v-form>
      <v-row :no-gutters="true">
        <v-col cols="3">
          <v-text-field
            readonly
            label="姓名"
            variant="outlined"
            :value="loginStore.loginEmployee.name"
          >
          </v-text-field>
        </v-col>
        <v-col cols="3" offset="1">
          <v-text-field
            readonly
            variant="outlined"
            :value="loginStore.loginEmployee.email"
            label="工号"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row :no-gutters="true">
        <v-col cols="3">
          <v-text-field
            readonly
            variant="outlined"
            :value="loginStore.loginEmployee.phone"
            label="电话号码"
          >
          </v-text-field>
        </v-col>
        <v-col cols="3" offset="1">
          <v-text-field
            readonly
            variant="outlined"
            :value="loginStore.loginEmployee.email"
            label="电子邮箱"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row :no-gutters="true">
        <v-col cols="3">
          <v-text-field
            readonly
            variant="outlined"
            :value="loginStore.loginEmployee.identity"
            label="身份证号"
          >
          </v-text-field>
        </v-col>
        <v-col cols="3" offset="1">
          <v-text-field
            readonly
            variant="outlined"
            :value="loginStore.loginEmployee.birthday"
            label="出生日期"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { useLoginStore } from "@/store";

const loginStore = useLoginStore();
</script>

<style scoped></style>
