<script setup lang="ts">
import type { IInputProps } from "~/types";

const value = defineModel();

defineProps<IInputProps>();
</script>

<template>
  <div class="input">
    <p v-if="label" class="input__label">{{ label }}</p>
    <input
      v-model="value"
      :type="type || 'text'"
      :class="[
        'input__input',
        {
          '--small': type === 'number',
        },
      ]"
      :placeholder="placeholder"
    />
  </div>
</template>

<style scoped lang="scss">
.input {
  width: max-content;

  &__label {
    margin-bottom: 5px;
  }

  &__input {
    width: 100%;
    padding: 5px 10px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    &::placeholder {
      font-size: 16px;
    }

    &.--small {
      width: 60px;
      text-align: center;
    }
  }
}
</style>
