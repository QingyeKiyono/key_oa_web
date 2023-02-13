<template>
  <v-data-table :headers="headers" :items="pages"></v-data-table>
</template>

<script setup lang="ts">
import {PageRes, VDataTableHeader} from "@/common/types";
import {onMounted, ref} from "vue";
import {jsonResRequest} from "@/utils";

// 表格标题
const headers: Array<VDataTableHeader> = [
  {
    title: "Url",
    key: "url",
    align: "start",
    sortable: false,
  },
  {
    title: "图标",
    key: "icon",
    align: "start",
    sortable: false,
  },
  {
    title: "图标组",
    key: "pageGroup",
    align: "start",
    sortable: true,
  },
  {
    title: "父元素",
    key: "parent",
    align: "start",
    sortable: false,
  },
];

let pages = ref(new Array<PageRes>());

onMounted(() => {
  jsonResRequest<Array<PageRes>>({
    url: "/pages",
    params: {
      page: 1,
      size: 10,
    },
  }).then((res) => {
    pages.value.push(...res.data)
  });
});
</script>

<style scoped></style>
