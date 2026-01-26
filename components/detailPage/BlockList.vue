<script setup lang="ts">
import type {
  IPageBlockListItem,
  IPageBlockListProps,
  IPageData,
} from "~/types";

const mainStore = useMainStore();

const props = defineProps<IPageBlockListProps>();

const activeSettingsItem = ref<IPageBlockListItem | null>(null);
const settingsActive = ref<boolean>(false);

const page = computed(() =>
  mainStore.pages.find((page: IPageData) => page.pageId === props.pageId)
);

const openItemSettings = (item: IPageBlockListItem) => {
  activeSettingsItem.value = deepClone(item);
  settingsActive.value = true;
};

const saveItemChanges = (newData: IPageBlockListItem, isChild?: boolean) => {
  if (!page.value || !newData.itemId) {
    console.warn("Cannot save changes: missing page or itemId");
    return;
  }
  try {
    if (isChild) {
      const parentItem = props.list.find((item) =>
        item.children?.some((child) => child.itemId === newData.itemId)
      );
      if (!parentItem) {
        console.warn(`Parent item not found for child ${newData.itemId}`);
        return;
      }
      mainStore.updateBlockListItemChild(
        page.value.pageId,
        props.blockId,
        parentItem.itemId,
        newData.itemId,
        newData
      );
    } else {
      mainStore.updateBlockListItem(
        page.value.pageId,
        props.blockId,
        newData.itemId,
        newData
      );
    }
  } catch (error) {
    console.error("Error saving item changes:", error);
  }
};

const deleteItem = (itemId: string) => {
  if (!page.value || !itemId) {
    console.warn("Cannot delete item: missing page or itemId");
    return;
  }

  try {
    mainStore.deleteBlockListItem(page.value.pageId, props.blockId, itemId);
  } catch (error) {
    console.error("Error deleting item:", error);
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
