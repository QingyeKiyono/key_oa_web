<template>
  <div class="v-text-center">
    <v-table :fixed-header="true">
      <thead>
        <tr>
          <th class="text-left">姓名</th>
          <th class="text-left">工号</th>
          <th class="text-left">电话号码</th>
          <th class="text-left">出生日期</th>
          <th class="text-left">电子邮箱</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in state.employeeList" :key="employee.id">
          <td>{{ employee.name }}</td>
          <td>{{ employee.jobNumber }}</td>
          <td>{{ employee.phone }}</td>
          <td>{{ employee.birthday }}</td>
          <td>{{ employee.email }}</td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
      v-model="state.page"
      :length="state.length"
      v-on:update:modelValue="updatePage"
    ></v-pagination>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";

import { jsonResRequest } from "@/utils";
import { Employee } from "@/common";

let state = reactive({
  // 员工的列表
  employeeList: new Array<Employee>(),
  // 和分页有关的变量，分别是：页号；页数；每页员工数
  page: 1,
  length: 1,
  pageSize: 10,
});

// 页面更新后的动作，即获取对应页面的员工列表
function updatePage(page: Number): void {
  jsonResRequest<Array<Employee>>({
    url: "/employees",
    params: {
      page: page,
      size: state.pageSize,
    },
  }).then((res) => {
    state.employeeList = res.data;
  });
}

onMounted(() => {
  // 首先获取员工数量，确定分页有几页
  jsonResRequest<number>({
    url: "/employees/count",
  }).then((res) => {
    state.length = Math.ceil(res.data / state.pageSize);
  });

  // 然后获取第一页的员工
  updatePage(state.page);
});
</script>

<style scoped></style>
