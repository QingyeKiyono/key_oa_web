<template>
  <v-container class="ma-1 pa-0" fluid>
    <!--suppress HtmlUnknownBooleanAttribute -->
    <v-row justify="start" no-gutters>
      <v-col cols="1">
        <v-btn
          @click="router.push('/profile/new')"
          class="d-inline"
          variant="outlined"
        >
          新建员工信息
        </v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn
          @click="deleteEmployees"
          variant="outlined"
          :disabled="state.selectEmployees.length === 0"
        >
          删除
        </v-btn>
      </v-col>
    </v-row>
    <v-table :fixed-header="true" class="pa-1">
      <thead>
        <tr>
          <th class="text-left"></th>
          <th class="text-left v-col-1">姓名</th>
          <th class="text-left">工号</th>
          <th class="text-left">电话号码</th>
          <th class="text-left">出生日期</th>
          <th class="text-left v-col-2">电子邮箱</th>
          <th class="text-left v-col-4">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in state.employeeList" :key="employee.id">
          <td>
            <v-checkbox-btn
              :disabled="employee.jobNumber === store.jobNumber"
              v-model="state.selectEmployees"
              :value="employee.jobNumber"
            ></v-checkbox-btn>
          </td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.jobNumber }}</td>
          <td>{{ employee.phone }}</td>
          <td>{{ employee.birthday }}</td>
          <td>{{ employee.email }}</td>
          <td>
            <v-row>
              <v-btn @click="router.push(`/profile/${employee.jobNumber}`)">
                查看详细信息
              </v-btn>
              <v-btn class="offset-1">发送消息</v-btn>
            </v-row>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
      v-model="state.page"
      :length="state.length"
      v-on:update:modelValue="updatePage"
    ></v-pagination>
  </v-container>
</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue";

import {jsonResRequest} from "@/utils";
import {Employee} from "@/common";
import router from "@/router";
import {useLoginStore} from "@/store";

const store = useLoginStore();

let state = reactive({
  // 员工的列表
  employeeList: new Array<Employee>(),
  // 和分页有关的变量，分别是：页号；页数；每页员工数
  page: 1,
  length: 1,
  pageSize: 8,
  selectEmployees: [] as Array<string>,
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

function deleteEmployees() {
  console.log(state.selectEmployees.length);
  jsonResRequest({
    url: "/employees/:deleteBatch",
    method: "DELETE",
    data: JSON.stringify(state.selectEmployees),
  }).then(() => {
    router.go(0);
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
