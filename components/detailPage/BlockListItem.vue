<script setup lang="ts">
import type { IPageBlockListItemProps } from "~/types";
import { Button, Checkbox } from "@featherui";

const props = defineProps<IPageBlockListItemProps>();
defineEmits(["openItemSettings"]);

const pointsProgress = computed(() => {
  const item = props.item;
  if (!item.children) return item.points;
  if (!item.showChildren) return `${item.checked ? item.points : 0}/${item.points}`;

  const current = item.children.reduce((acc, child) => {
    if (!child.checked) return acc;
    return acc + child.points;
  }, 0);
  const total = item.children.reduce((acc, child) => acc + child.points, 0);

  return `${current}/${total}`;
});
</script>

<template>
  <div :class="['page-block-list-item', {
    '--child': !item.children,
  }]">
    <div class="page-block-list-item__content">
      <Button
        v-if="item.children"
        class="page-block-list-item__settings"
        iconOnly
        :theme="mainTheme"
        size="small"
        @click="$emit('openItemSettings', item)"
      >
        <AppIcon name="settings" :size="20" />
      </Button>

      <Checkbox
        v-model="item.checked"
        :activeTheme="mainTheme"
        :disabled="item.showChildren"
        class="page-block-list-item__checkbox"
      />

      <AppInput v-model="item.label" class="page-block-list-item__input" />

      <span class="page-block-list-item__progress">{{ pointsProgress }}</span>
    </div>

    <ul v-if="item.children" class="page-block-list-item__children">
      <li v-for="child of item.children">
        <BlockListItem :item="child" :mainTheme="mainTheme" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.page-block-list-item {
  width: 100%;

  &:hover {
    .page-block-list-item__settings {
      opacity: 1;
    }
  }

  &.--child {
    width: calc(100% - 100px);
    margin-left: 100px;
  }

  &__content {
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: -40px;
  }

  &__checkbox {
  }

  &__input {
    width: 100%;
    flex: 1;
  }

  &__settings {
    margin-right: 20px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &__progress {
    font-size: 16px;
    color: $color-grey;
  }
}
</style>
