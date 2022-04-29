<script setup lang="ts">
import { ref } from "vue";
import request from "../utils/WebUtil";
import { ElButton } from "element-plus";

const message = ref("JWT");

const changeData = () => {
  request({
    url: "/login",
    data: {
      jobNumber: "20221390",
      password: "1234"
    },
    method: "POST"
  }).then((data) => {
    message.value = data.data;
  });
};
</script>

<template>
  <el-button @click="changeData">Click me to get JWT token.</el-button>
  <p>{{ message }}</p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
