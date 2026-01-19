<script setup lang="ts">
import type { IMenuItemProps } from "~/types";
import { Button } from "@featherui";

defineProps<IMenuItemProps>();
</script>

<template>
  <NuxtLink class="menu-item" :to="link">
    <Button iconOnly :theme="theme">
      <AppIcon :name="iconName" :size="32" class="menu-item__icon" />
    </Button>
    <p :class="`menu-item__label color-${theme}`">
      {{ label }}
    </p>
  </NuxtLink>
</template>

<style scoped lang="scss">
.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;

  &:not(:hover) {
    .menu-item__label {
      color: v-bind(contrastColor);
      border-color: v-bind(contrastColor);
    }
  }

  &__icon {
    color: v-bind(contrastColor);
  }

  &__label {
    font-weight: bold;
    opacity: 0;
    transition: all 0.2s;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
