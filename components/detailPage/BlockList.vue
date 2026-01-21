<script setup lang="ts">
import type { IPageBlockListItem, IPageBlockListProps } from "~/types";
import { Button } from "@featherui";

const mainStore = useMainStore();

const props = defineProps<IPageBlockListProps>();

const activeSettingsItem = ref<Required<IPageBlockListItem> | null>(
  props.list[0] || null
);
const settingsActive = ref<boolean>(false);

const page = computed(() =>
  mainStore.pages.find((page) => page.pageId === props.pageId)
);

const openItemSettings = (item: Required<IPageBlockListItem>) => {
  activeSettingsItem.value = item;
  settingsActive.value = true;
};

const saveItemChanges = (
  newData: Partial<IPageBlockListItem>,
  isChild?: boolean
) => {
  console.log("newData, isChild: ", newData, isChild);
  if (page.value) {
    const blocks = toRaw(page.value.blocks).map((block) => {
      if (block.blockId !== props.blockId) return block;

      if (isChild) {
        console.log("block.list: ", block.list);
        const list = block.list.map((item) => {
          const currentChild = item.children.find(
            (child) => child.itemId === newData.itemId
          );
          console.log("currentChild: ", currentChild);
          if (!currentChild) return item;
          return {
            ...item,
            children: item.children.map((child) => {
              if (child.itemId !== newData.itemId) return child;
              return { ...currentChild, ...newData };
            }),
          };
        });
        return { ...block, list };
      } else {
        const list = block.list.map((item) => {
          if (item.itemId !== newData.itemId) return item;
          return { ...item, ...newData };
        });
        return { ...block, list };
      }
    });
    console.log("result: ", { pageId: page.value.pageId, blocks });
    mainStore.editPage({ pageId: page.value.pageId, blocks });
  }
};

const deleteItem = (itemId: string) => {
  if (page.value) {
    const blocks = page.value.blocks.map((block) => {
      if (block.blockId !== props.blockId) return block;
      const list = block.list.filter((item) => item.itemId !== itemId);
      return { ...block, list };
    });
    mainStore.editPage({ pageId: page.value.pageId, blocks });
  }
};
</script>

<template>
  <section>
    <ul class="page-block-list">
      <li v-for="item of list" :key="item.itemId" class="page-block-list__item">
        <DetailPageBlockListItem
          :item="item"
          :mainTheme="mainTheme"
          @openItemSettings="openItemSettings"
          @saveItemChanges="saveItemChanges"
        />
      </li>
    </ul>

    <DetailPageBlockListItemSettingsModal
      v-model="settingsActive"
      :item="activeSettingsItem"
      :mainTheme="mainTheme"
      @saveChanges="saveItemChanges"
      @deleteItem="deleteItem"
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
