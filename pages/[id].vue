<script setup lang="ts">
import { Button } from "@featherui";
import { v4 as uuidv4 } from "uuid";

const workspacesStore = useWorkspacesStore();
const userStore = useUserStore();
const route = useRoute();

const workspaceData = computed(
  () =>
    workspacesStore.workspaces.find(
      (workspace) => workspace.workspaceId === (route.params.id as string)
    )!
);
const contrastColor = computed(() => userStore.contrastColor);
const mainTheme = computed(() => userStore.mainTheme);

const addBlock = () => {
  if (!workspaceData.value) return;

  workspaceData.value.blocks.push({
    blockId: uuidv4(),
    label: "Название блока",
    progress: 0,
    list: [
      {
        itemId: uuidv4(),
        label: generateItemLabel(),
        checked: false,
        points: 1,
        showChildren: false,
        children: [],
      },
    ],
  });

  workspacesStore.editWorkspace(workspaceData.value);
};
</script>

<template>
  <article v-if="workspaceData" class="detail-workspace">
    <h1 class="detail-workspace__title">{{ workspaceData.name }}</h1>

    <template v-for="block of workspaceData.blocks" :key="block.blockId">
      <WorkspaceBlock
        :workspaceData="workspaceData"
        :block="block"
        :contrastColor="contrastColor"
      />
    </template>

    <Button label="Добавить блок" @click="addBlock" :theme="mainTheme">
      <AppIcon name="box" :size="20" />
    </Button>
  </article>
</template>

<style scoped lang="scss">
.detail-workspace {
  &__title {
    font-size: 40px;
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>
