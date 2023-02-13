<template>
  <v-data-table
    :headers="headers"
    :items="pages"
    @update:options="test"
  ></v-data-table>
</template>

<script setup lang="ts">
import {DataTableHeader, PageRes} from "@/common/types";
import {onMounted, ref} from "vue";
import {jsonResRequest} from "@/utils";

// 表格标题
const headers: Array<DataTableHeader> = [
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
  console.log(paras);
  fetchPages((paras as any).page, (paras as any).itemsPerPage);
}

onMounted(() => {
  fetchPages(1, 10);
});
</script>

<style scoped></style>
