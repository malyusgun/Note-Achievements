<script setup lang="ts">
import type { IPageBlockListItem, IPageBlockListProps } from "~/types";
import { Button } from "@featherui";

const props = defineProps<IPageBlockListProps>();
let timerId: number;

const activeSettingsItem = ref<IPageBlockListItem | null>(
  props.list[0] || null
);
const settingsActive = ref<boolean>(false);

const openItemSettings = (item: IPageBlockListItem) => {
  activeSettingsItem.value = item;
  settingsActive.value = true;
};

const saveItemChanges = (newData: IPageBlockListItem) => {
  console.log("item changes: ", newData);
};

watch(
  () => props.list,
  () => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      console.log("changes");
    }, 500);
  },
  { deep: true }
);
</script>

<template>
  <section>
    <ul class="page-block-list">
      <li v-for="item of list" class="page-block-list__item">
        <DetailPageBlockListItem
          :item="item"
          :mainTheme="mainTheme"
          @openItemSettings="openItemSettings"
        />
      </li>
    </ul>

    <DetailPageBlockListItemSettingsModal
      v-model="settingsActive"
      :item="activeSettingsItem"
      :mainTheme="mainTheme"
      @saveChanges="saveItemChanges"
    />
  </section>
</template>

<style scoped lang="scss">
.page-block-list {
  &__item {
    display: flex;
    justify-content: space-between;

    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
}
</style>
