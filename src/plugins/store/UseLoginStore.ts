import { defineStore } from "pinia";
import { Employee } from "@/common";

const useLoginStore = defineStore("login", {
  state: () => {
    return {
      loginEmployee: {} as Employee,
    };
  },

  getters: {
    name: (state) => {
      return state.loginEmployee.name;
    },
    jobNumber: (state) => {
      return state.loginEmployee.jobNumber;
    },
  },

  actions: {
    setLoginEmployee(employee: Employee) {
      this.loginEmployee = employee;
    },
  },
});

export default useLoginStore;
