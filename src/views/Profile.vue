<template>
  {{ props.jobNumber }}
</template>

<script setup lang="ts">
const props = defineProps({
  jobNumber: {
    type: String,
    required: true,
    validator: (value: string) => {
      const reg: RegExp = new RegExp("\d{8}");
      return reg.test(value);
    }
  }
});
</script>

<style scoped></style>
