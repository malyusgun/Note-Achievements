<script setup lang="ts">
import type { IInputProps } from "~/types";

defineProps<IInputProps>();
defineEmits(["change"]);

const value = defineModel();
</script>

<template>
  <AppInput
    v-model="value"
    class="input"
    :label="label"
    :placeholder="placeholder"
    :type="type"
    :disabled="disabled"
    @change="$emit('change', value)"
  />
</template>

<style scoped lang="scss">
.input {
  :deep(.input__input) {
    border: 2px solid $color-grey;
    border-radius: 6px;
  }
}
</style>
