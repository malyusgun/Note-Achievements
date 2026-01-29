<script setup lang="ts">
import type {
  IWorkspaceBlockListItem,
  IWorkspaceBlockListProps,
  IWorkspaceData,
} from "~/types";

const mainStore = useMainStore();

const props = defineProps<IWorkspaceBlockListProps>();

const activeSettingsItem = ref<IWorkspaceBlockListItem | null>(null);
const settingsActive = ref<boolean>(false);

const workspace = computed(() =>
  mainStore.workspaces.find(
    (workspace: IWorkspaceData) => workspace.workspaceId === props.workspaceId
  )
);

const openItemSettings = (item: IWorkspaceBlockListItem) => {
  activeSettingsItem.value = deepClone(item);
  settingsActive.value = true;
};

const saveItemChanges = (
  newData: IWorkspaceBlockListItem,
  isChild?: boolean
) => {
  if (!workspace.value || !newData.itemId) {
    console.warn("Cannot save changes: missing workspace or itemId");
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
        workspace.value.workspaceId,
        props.blockId,
        parentItem.itemId,
        newData.itemId,
        newData
      );
    } else {
      mainStore.updateBlockListItem(
        workspace.value.workspaceId,
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
  if (!workspace.value || !itemId) {
    console.warn("Cannot delete item: missing workspace or itemId");
    return;
  }

  try {
    mainStore.deleteBlockListItem(
      workspace.value.workspaceId,
      props.blockId,
      itemId
    );
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};
</script>

<template>
  <section>
    <ul class="workspace-block-list">
      <li
        v-for="item of list"
        :key="item.itemId"
        class="workspace-block-list__item"
      >
        <WorkspaceBlockListItem
          :item="item"
          :mainTheme="mainTheme"
          @openItemSettings="openItemSettings"
          @saveItemChanges="saveItemChanges"
        />
      </li>
    </ul>

    <WorkspaceBlockListItemSettingsModal
      v-model="settingsActive"
      :item="activeSettingsItem"
      :mainTheme="mainTheme"
      @saveChanges="saveItemChanges"
      @deleteItem="deleteItem"
    />
  </section>
</template>

<style scoped lang="scss">
.workspace-block-list {
  &__item {
    display: flex;
    justify-content: space-between;

    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
}
</style>
