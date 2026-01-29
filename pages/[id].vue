<script setup lang="ts">
import { Button } from "@featherui";
import { v4 as uuidv4 } from "uuid";

const mainStore = useMainStore();
const route = useRoute();

const workspaceData = computed(
  () =>
    mainStore.workspaces.find(
      (workspace) => workspace.workspaceId === (route.params.id as string)
    )!
);
const contrastColor = computed(() => mainStore.contrastColor);
const mainTheme = computed(() => mainStore.mainTheme);

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

  mainStore.editWorkspace(workspaceData.value);
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
  height: 100vh;
  overflow-y: auto;
  padding: 20px 40px;

  &__title {
    font-size: 40px;
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>
