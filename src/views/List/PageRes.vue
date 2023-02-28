<!--suppress VueUnrecognizedSlot -->
<template>
  <v-data-table-server
    :items-length="count"
    v-model:items-per-page="size"
    :headers="headers"
    :items="pages"
    :loading="loading"
    @update:options="updateTable"
    class="ma-3"
  >
    <template v-slot:top>
      <v-toolbar density="compact">
        <v-toolbar-title>页面列表</v-toolbar-title>
        <v-divider inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn>新建页面信息</v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.pageGroup="{ item }">
      <v-icon>{{ item.raw.pageGroup ? "mdi-check" : "mdi-close" }}</v-icon>
    </template>
    <template v-slot:item.icon="{ item }">
      <v-icon>{{ item.raw.icon }}</v-icon>
    </template>
    <!-- 这里parent的判断和官方文档不一致，目前文档补全，无法正确实现 -->
    <template v-slot:item.parent="{ parent }">
      {{ parent == null ? "无" : parent.id }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn
        size="x-small"
        variant="outlined"
        icon="mdi-pencil"
        class="mr-2"
      ></v-btn>
      <v-btn size="x-small" variant="outlined" icon="mdi-delete"></v-btn>
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { DataTableHeader, PageRes } from "@/common";
import { jsonResRequest } from "@/utils";

// 表格标题
const headers: Array<DataTableHeader> = [
  { title: "Id", key: "id" },
  { title: "Url", key: "url" },
  { title: "图标", key: "icon" },
  { title: "描述", key: "description" },
  { title: "图标组", key: "pageGroup", sortable: true },
  { title: "父元素", key: "parent" },
  { title: "操作", key: "actions" },
];

const pages = ref(new Array<PageRes>()); // 获取到的页面信息
const count = ref(0); // 页面总数
const size = ref(10); // 每页展示页面数量

const loading = ref(true); // 表格加载状态

function fetchPages(page: Number, size: Number) {
  loading.value = true;

  // Start loading
  jsonResRequest<Array<PageRes>>({
    url: "/pages",
    params: { page, size },
  }).then((res) => {
    pages.value = res.data;
  });

  // Data loaded
  loading.value = false;
}

function updateTable(paras: Object) {
  fetchPages((paras as any).page, (paras as any).itemsPerPage);
}

onMounted(() => {
  // 获取页面总数
  jsonResRequest<number>({
    url: "/pages/count",
  }).then((res) => (count.value = res.data));

  // 然后获取第一页的页面信息
  fetchPages(1, 10);
});
</script>

<style scoped></style>
