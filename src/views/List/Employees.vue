<!--suppress VueUnrecognizedSlot -->
<template>
  <v-data-table-server
    :items-length="count"
    v-model:items-per-page="size"
    :headers="headers"
    :items="employees"
    :loading="loading"
    @update:options="updateTable"
    class="ma-3"
  >
    <template v-slot:top>
      <v-toolbar density="compact">
        <v-toolbar-title>员工列表</v-toolbar-title>
        <v-divider inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn>新建员工信息</v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.verified="{ item }">
      <v-icon>{{ item.raw.verified ? "mdi-check" : "mdi-close" }}</v-icon>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn
        size="x-small"
        variant="outlined"
        icon="mdi-pencil"
        class="mr-2"
      ></v-btn>
      <v-btn
        size="x-small"
        variant="outlined"
        icon="mdi-delete"
        :disabled="item.raw.jobNumber === login.loginEmployee.jobNumber"
        @click="deleteEmployee"
      >
      </v-btn>
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

import {jsonResRequest} from "@/utils";
import {DataTableHeader, Employee} from "@/common";
import {useLoginStore} from "@/store";

const headers: Array<DataTableHeader> = [
  { title: "Id", key: "id" },
  { title: "姓名", key: "name" },
  { title: "工号", key: "jobNumber" },
  { title: "电话号码", key: "phone" },
  { title: "电子邮箱", key: "email" },
  { title: "出生日期", key: "birthday" },
  { title: "激活", key: "verified" },
  { title: "操作", key: "actions" },
];

const employees = ref(new Array<Employee>()); // 获取到的员工信息
const count = ref(0); // 员工总数
const size = ref(10); // 每页展示员工数

const loading = ref(false); // 表格的加载状态

const login = useLoginStore(); // 当前登录状态

// 页面更新后的动作，即获取对应页面的员工列表
function fetchEmployees(page: Number, size: Number) {
  loading.value = true;
  // Load data
  jsonResRequest<Array<Employee>>({
    url: "/employees",
    params: { page, size },
  }).then((res) => {
    employees.value = res.data;
  });

  // Data loaded
  loading.value = false;
}

function updateTable(paras: Object) {
  fetchEmployees((paras as any).page, (paras as any).itemsPerPage);
}

function deleteEmployee() {
  console.log(123);
}

onMounted(() => {
  // 获取员工总数
  jsonResRequest<number>({
    url: "/employees/count",
  }).then((res) => (count.value = res.data));

  // 然后获取第一页的员工
  fetchEmployees(1, size.value);
});
</script>

<style scoped></style>
