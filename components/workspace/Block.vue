<script setup lang="ts">
import { Modal, Button, ProgressBar } from "@featherui";
import type { IWorkspaceBlockProps } from "~/types";
import { v4 as uuidv4 } from "uuid";

const props = defineProps<IWorkspaceBlockProps>();

const mainStore = useMainStore();

const deleteModal = ref<boolean>(false);

const workspaceId = computed(() => props.workspaceData.workspaceId);
const mainTheme = computed(() => mainStore.mainTheme);
const list = computed(() => props.block.list);
const deleteModalDescription = computed(
  () => `Вы собираетесь удалить блок "${props.block.label}"`
);
const progressBarValue = computed(() => {
  let active = 0;
  let total = 0;
  for (const item of list.value) {
    total += item.points;
    if (item.showChildren && item.children) {
      active += item.children.reduce((acc, cur) => {
        if (cur.checked) return acc + cur.points;
        if (cur.tracker)
          return acc + (cur.points / cur.tracker.max) * cur.tracker.value;
        return acc;
      }, 0);
    } else {
      active += item.checked
        ? item.points
        : item.tracker
          ? (item.points / item.tracker.max) * item.tracker.value
          : 0;
    }
  }
  return ((active / (total || 1)) * 100).toFixed(0);
});

const onBlockChange = (changes: object) => {
  const blockId = props.block.blockId;
  const workspace = mainStore.getWorkspace(workspaceId.value);
  if (!workspace) return;

  const blocks = workspace.blocks.map((block) =>
    block.blockId === blockId ? { ...block, ...changes } : block
  );
  mainStore.editWorkspace({ workspaceId: workspace.workspaceId, blocks });
};

const deleteBlock = () => {
  const blocks = props.workspaceData.blocks.filter(
    (block) => block.blockId !== props.block.blockId
  );

  mainStore.editWorkspace({
    workspaceId: props.workspaceData.workspaceId,
    blocks,
  });
};

const addItem = () => {
  const blocks = props.workspaceData.blocks.map((block) => {
    if (block.blockId !== props.block.blockId) return block;

    return {
      ...block,
      list: [
        ...block.list,
        {
          itemId: uuidv4(),
          label: generateItemLabel(),
          checked: false,
          points: 1,
          showChildren: false,
          children: [],
        },
      ],
    };
  });

  mainStore.editWorkspace({
    workspaceId: props.workspaceData.workspaceId,
    blocks,
  });
};

const updateBlockProgress = (newValue: string) => {
  const blocks = props.workspaceData.blocks.map((block) => {
    if (block.blockId !== props.block.blockId) return block;

    return {
      ...block,
      progress: +newValue,
    };
  });
  mainStore.editWorkspace({
    workspaceId: props.workspaceData.workspaceId,
    blocks,
  });
};

watch(progressBarValue, (value) => {
  updateBlockProgress(value);
});
</script>

<template>
  <section class="workspace-block">
    <h3 class="workspace-block__title">
      <AppInput
        class="workspace-block__title-input"
        :modelValue="block.label"
        @change="(label) => onBlockChange({ label })"
      />

      <Button
        class="workspace-block__delete-button"
        iconOnly
        size="small"
        :theme="mainTheme"
        @click="deleteModal = true"
      >
        <AppIcon name="basket" :size="20" />
      </Button>

      <ConfirmDeleteModal
        v-model="deleteModal"
        :description="deleteModalDescription"
        @confirm="deleteBlock"
      />
    </h3>
    <ProgressBar
      class="workspace-block__progress"
      :value="progressBarValue"
      width="100%"
      :gradient="['red', 'yellow', 'green', '#0066ff']"
      theme="white"
      disabled
    />

    <WorkspaceBlockList
      :workspaceId="workspaceId"
      :blockId="block.blockId"
      :list="block.list"
      :mainTheme="mainTheme"
      class="workspace-block__list"
    />
    <Button label="Добавить пункт" @click="addItem" size="small">
      <AppIcon name="checkmark" :size="14" />
    </Button>
  </section>
</template>

<style scoped lang="scss">
.workspace-block {
  border-top: 2px solid v-bind(contrastColor);
  margin: 20px 0;
  padding: 20px;

  &:hover {
    .workspace-block__delete-button {
      opacity: 1;
    }
  }

  &__title {
    display: flex;
    margin-bottom: 20px;
  }

  &__title-input {
    flex: 1;
    font-size: 28px;
  }

  &__list {
    margin: 20px 0;
  }

  &__delete-button {
    opacity: 0;
    transition: opacity 0.2s;
  }
}
</style>
