<script setup lang="ts">
import type { IPageBlockListItemProps } from "~/types";
import { Button, Checkbox } from "@featherui";

defineProps<IPageBlockListItemProps>();
defineEmits(["openItemSettings"]);
</script>

<template>
  <div class="page-block-list-item">
    <Checkbox
      v-model="item.checked"
      :activeTheme="mainTheme"
      class="page-block-list-item__checkbox"
    />
    <AppInput v-model="item.label" class="page-block-list-item__input" />

    <Button
      class="page-block-list-item__settings"
      iconOnly
      :theme="mainTheme"
      size="small"
      @click="$emit('openItemSettings', item)"
    >
      <AppIcon name="settings" :size="20" />
    </Button>
  </div>
</template>

<style scoped lang="scss">
.page-block-list-item {
  display: flex;
  align-items: center;
  flex: 1;

  &:hover {
    .page-block-list-item__settings {
      opacity: 1;
    }
  }

  &__checkbox {
  }

  &__input {
    width: 100%;
    flex: 1;
  }

  &__settings {
    opacity: 0;
    transition: opacity 0.2s;
  }
}
</style>