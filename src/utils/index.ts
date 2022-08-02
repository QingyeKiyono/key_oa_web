// Base request method.
import { request, jsonResRequest } from "./WebUtil";
export { request, jsonResRequest };

// Actuator methods.
import {
  getMetricsNames,
  getCPUCount,
  getCPUUsage,
  getJVMMemoryMax,
  getJVMMemoryUsed,
  getDiskTotal,
  getDiskFree,
} from "@/utils/Actuator";
export {
  getMetricsNames,
  getCPUCount,
  getCPUUsage,
  getJVMMemoryMax,
  getJVMMemoryUsed,
  getDiskTotal,
  getDiskFree,
};

// Validators
import { phone, identity } from "@/utils/Validator";
export { phone, identity };
