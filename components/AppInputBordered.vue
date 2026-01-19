<script setup lang="ts">
import type { IInputProps } from "~/types";

defineProps<IInputProps>();

const value = defineModel();
</script>

<template>
  <AppInput v-model="value" class="input" :label="label" :placeholder="placeholder" :type="type" />
</template>

<style scoped lang="scss">
.input {
  :deep(.input__input) {
    border: 2px solid $color-grey;
    border-radius: 6px;
  }
}
</style>