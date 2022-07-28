<template>
  <v-container>
    <v-form>
      <v-row :no-gutters="true">
        <v-col cols="3">
          <v-text-field
            readonly
            label="姓名"
            variant="outlined"
            :value="state.currentEmployee.name"
          >
          </v-text-field>
        </v-col>
        <v-col cols="3" offset="1">
          <v-text-field
            readonly
            variant="outlined"
            :value="state.currentEmployee.email"
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
            :value="state.currentEmployee.phone"
            label="电话号码"
          >
          </v-text-field>
        </v-col>
        <v-col cols="3" offset="1">
          <v-text-field
            readonly
            variant="outlined"
            :value="state.currentEmployee.email"
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
            :value="state.currentEmployee.identity"
            label="身份证号"
          >
          </v-text-field>
        </v-col>
        <v-col cols="3" offset="1">
          <v-text-field
            readonly
            variant="outlined"
            :value="state.currentEmployee.birthday"
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
import { defineProps, onMounted, reactive} from "vue";
import { Employee } from "@/common";
import { jsonResRequest } from "@/utils";

const loginStore = useLoginStore();

let props = defineProps({
  profile: {
    type: String,
    required: true,
    validator(value: String) {
      if (value == "new") {
        return true;
      }
      return value.length > 0;
    },
  },
});

let state = reactive({ currentEmployee: {} as Employee });

onMounted(() => {
  // 创建新的员工
  if ((props.profile as string) === "new") {
    console.log("This is a new employee.");
    return;
  }
  // 当前登录的员工查看自己的个人信息
  if ((props.profile as string) === state.currentEmployee.jobNumber) {
    state.currentEmployee = loginStore.loginEmployee;
    console.log(state.currentEmployee);
    console.log("This is current employee's profile.");
    return;
  }
  // 其他情况，包括查看其它员工的个人信息、用户输入URL强行访问
  jsonResRequest<Employee>({
    url: `/employees/${props.profile}`,
  }).then((res) => {
    state.currentEmployee = res.data;
  });
});
</script>

<style scoped></style>
