<!--suppress VueUnrecognizedSlot -->
<template>
  <v-data-table :headers="headers" :items="pages" @update:options="test" class="ma-3">
    <template v-slot:item.pageGroup="{ item }">
      <v-icon>{{ item.raw.pageGroup ? "mdi-check" : "mdi-close" }}</v-icon>
    </template>
    <template v-slot:item.icon="{ item }">
      <v-icon>{{ item.raw.icon }}</v-icon>
    </template>
    <template v-slot:item.parent="{ parent }">
      {{ parent == null ? "无" : parent.id }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2">mdi-pencil</v-icon>
      <v-icon size="small">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import {DataTableHeader, PageRes} from "@/common/types";
import {onMounted, ref} from "vue";
import {jsonResRequest} from "@/utils";

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

const pages = ref(new Array<PageRes>());

function fetchPages(page: Number, size: Number) {
  jsonResRequest<Array<PageRes>>({
    url: "/pages",
    params: { page, size },
  }).then((res) => {
    pages.value = res.data;
  });
}

function test(paras: Object) {
  fetchPages((paras as any).page, (paras as any).itemsPerPage);
}

onMounted(() => {
  fetchPages(1, 10);
});
</script>

<style scoped></style>
