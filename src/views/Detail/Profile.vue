<template>
  <v-container fluid>
    <v-form>
      <v-row no-gutters>
        <v-col cols="3">
          <v-text-field
            :readonly="profile !== 'new'"
            label="姓名"
            variant="solo"
            v-model="state.currentEmployee.name"
            :error-messages="nameErrors"
          >
          </v-text-field>
        </v-col>
        <v-col cols="3" offset="1">
          <v-text-field
            :readonly="profile !== 'new'"
            variant="solo"
            v-model="state.currentEmployee.jobNumber"
            label="工号"
            :error-messages="jobNumberErrors"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="3">
          <v-text-field
            :readonly="profile !== 'new'"
            variant="solo"
            v-model="state.currentEmployee.phone"
            label="电话号码"
            :error-messages="phoneErrors"
          >
          </v-text-field>
        </v-col>
        <v-col cols="3" offset="1">
          <v-text-field
            :readonly="profile !== 'new'"
            variant="solo"
            v-model="state.currentEmployee.email"
            label="电子邮箱"
            :error-messages="emailErrors"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row :no-gutters="true">
        <v-col cols="3">
          <v-text-field
            :readonly="profile !== 'new'"
            variant="solo"
            v-model="state.currentEmployee.identity"
            label="身份证号"
            :error-messages="identityErrors"
          >
          </v-text-field>
        </v-col>
        <v-col cols="3" offset="1">
          <v-text-field
            :readonly="profile !== 'new'"
            variant="solo"
            v-model="state.currentEmployee.birthday"
            label="出生日期"
            type="date"
            :error-messages="birthdayErrors"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-col>
        <v-btn v-if="profile === 'new'" @click="router.back()">取消</v-btn>
      </v-col>
      <v-col>
        <v-btn
          v-if="profile === 'new'"
          :disabled="saveButtonDisabled"
          @click="saveEmployee"
        >
          新增员工
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from "vue";

import { useLoginStore } from "@/plugins/store";
import { Employee } from "@/common";
import { jsonResRequest, validation } from "@/utils";
import router from "@/plugins/router";

import useVuelidate from "@vuelidate/core";

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

const rules = computed(() => {
  return {
    currentEmployee: {
      name: {
        required: validation.required,
        maxLength: validation.maxLength(10),
      },
      jobNumber: {
        required: validation.required,
        maxLength: validation.maxLength(8),
        minLength: validation.minLength(8),
      },
      email: { required: validation.required, email: validation.email },
      phone: { required: validation.required, phone: validation.phone },
      identity: {
        required: validation.required,
        identity: validation.identity,
      },
      birthday: { required: validation.required },
    },
  };
});

let v$ = useVuelidate(rules, state);

const saveButtonDisabled = computed(() => {
  v$.value.$validate();
  return v$.value.$error;
});

const nameErrors = computed<Array<string>>(() => {
  const errors: Array<string> = [];
  v$.value.currentEmployee.name.$errors.forEach((error) => {
    errors.push(error.$message as string);
  });
  return errors;
});

const jobNumberErrors = computed<Array<string>>(() => {
  const errors: Array<string> = [];
  v$.value.currentEmployee.jobNumber.$errors.forEach((error) => {
    errors.push(error.$message as string);
  });
  return errors;
});

const phoneErrors = computed<Array<string>>(() => {
  const errors: Array<string> = [];
  v$.value.currentEmployee.phone.$errors.forEach((error) => {
    errors.push(error.$message as string);
  });
  return errors;
});

const emailErrors = computed<Array<string>>(() => {
  const errors: Array<string> = [];
  v$.value.currentEmployee.email.$errors.forEach((error) => {
    errors.push(error.$message as string);
  });
  return errors;
});

const identityErrors = computed<Array<string>>(() => {
  const errors: Array<string> = [];
  v$.value.currentEmployee.identity.$errors.forEach((error) => {
    errors.push(error.$message as string);
  });
  return errors;
});

const birthdayErrors = computed<Array<string>>(() => {
  const errors: Array<string> = [];
  v$.value.currentEmployee.birthday.$errors.forEach((error) => {
    errors.push(error.$message as string);
  });
  return errors;
});

function saveEmployee(): void {
  const employee: Employee = {
    id: 0,
    name: state.currentEmployee.name,
    gender: state.currentEmployee.gender,
    jobNumber: state.currentEmployee.jobNumber,
    phone: state.currentEmployee.phone,
    email: state.currentEmployee.email,
    identity: state.currentEmployee.email,
    birthday: state.currentEmployee.birthday,
    password: "1234",
    verified: false,
  };
  const data = JSON.stringify(employee);

  jsonResRequest({
    url: "/employees/",
    method: "POST",
    data,
  }).then((res) => {
    console.log(res.code);
    router.back();
  });
}

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
