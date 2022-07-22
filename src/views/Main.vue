<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="ma-5">
      <v-card-title> CPU </v-card-title>
      <v-card-text
        >{{ metrics.cpuUsage }}% - {{ metrics.cpuCount }} Cores</v-card-text
      >
    </v-card>
    <v-card class="ma-5">
      <v-card-title> JVM内存 </v-card-title>
      <v-card-text
        >{{ metrics.usedJVMMemory }} MB -
        {{ metrics.maxJVMMemory }} MB</v-card-text
      >
    </v-card>
    <v-card class="ma-5">
      <v-card-title> 硬盘 </v-card-title>
      <v-card-text
        >{{ metrics.freeDisk }} GB - {{ metrics.totalDisk }} GB</v-card-text
      >
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from "vue";
import {
  getCPUCount,
  getCPUUsage,
  getDiskFree,
  getDiskTotal,
  getJVMMemoryMax,
  getJVMMemoryUsed,
} from "@/utils";

const metrics = reactive({
  maxJVMMemory: "",
  usedJVMMemory: "",
  freeDisk: "",
  totalDisk: "",
  cpuCount: "",
  cpuUsage: "",
});

function formatNumber(
  num: number,
  type: "percentage" | "mega" | "giga",
  fix: number = 2
): string {
  if (type == "percentage") {
    return (num * 100).toFixed(fix);
  } else if (type == "mega") {
    return (num / 1024).toFixed(fix);
  } else if (type == "giga") {
    return (num / 1024 / 1024).toFixed(fix);
  } else {
    return "NaN";
  }
}

// 初始化所有的性能指标
function initMetrics(): void {
  // 这里需要在then回调函数中进行格式化，因此会比较丑
  getJVMMemoryMax().then((res) => {
    metrics.maxJVMMemory = formatNumber(
      res.measurements[0].value as number,
      "mega"
    );
  });
  getJVMMemoryUsed().then((res) => {
    metrics.usedJVMMemory = formatNumber(
      res.measurements[0].value as number,
      "mega"
    );
  });
  getCPUCount().then((res) => {
    metrics.cpuCount = res.measurements[0].value.toString();
  });
  getCPUUsage().then((res) => {
    metrics.cpuUsage = formatNumber(
      res.measurements[0].value as number,
      "percentage"
    );
  });
  getDiskFree().then((res) => {
    metrics.freeDisk = formatNumber(
      res.measurements[0].value as number,
      "giga"
    );
  });
  getDiskTotal().then((res) => {
    metrics.totalDisk = formatNumber(
      res.measurements[0].value as number,
      "giga"
    );
  });
}

let interval: NodeJS.Timer;
onMounted(() => {
  interval = setInterval(initMetrics, 1000);
});

onUnmounted(() => {
  // 记得在离开页面时清除定时任务，避免资源浪费
  clearInterval(interval);
});
</script>

<style scoped></style>
