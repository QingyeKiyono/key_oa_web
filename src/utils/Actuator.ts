import { request } from "./WebUtil";
import { Metrics, MetricsNames } from "@/common";

// 获取所有Metrics的名称
async function getMetricsNames(): Promise<MetricsNames> {
  return request<MetricsNames>({
    url: "/actuator/metrics",
  });
}

// 获取CPU的数量
async function getCPUCount(): Promise<Metrics> {
  return request<Metrics>({
    url: "/actuator/metrics/system.cpu.count",
  });
}

// 获取CPU使用率
async function getCPUUsage(): Promise<Metrics> {
  return request<Metrics>({
    url: "/actuator/metrics/system.cpu.usage",
  });
}

// 获取JVM最大内存
async function getJVMMemoryMax(): Promise<Metrics> {
  return request<Metrics>({
    url: "/actuator/metrics/jvm.memory.max",
  });
}

// 获取已经使用的JVM内存
async function getJVMMemoryUsed(): Promise<Metrics> {
  return request<Metrics>({
    url: "/actuator/metrics/jvm.memory.used",
  });
}

// 获取最大硬盘容量
async function getDiskTotal(): Promise<Metrics> {
  return request<Metrics>({
    url: "/actuator/metrics/disk.total",
  });
}

// 获取剩余硬盘容量
async function getDiskFree(): Promise<Metrics> {
  return request<Metrics>({
    url: "/actuator/metrics/disk.free",
  });
}

export {
  getMetricsNames,
  getCPUCount,
  getCPUUsage,
  getJVMMemoryMax,
  getJVMMemoryUsed,
  getDiskTotal,
  getDiskFree,
};
