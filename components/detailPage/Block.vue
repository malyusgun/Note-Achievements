<script setup lang="ts">
import { Modal, Button, ProgressBar } from "@featherui";
import type { IPageBlockProps } from "~/types";
import { v4 as uuidv4 } from "uuid";

const props = defineProps<IPageBlockProps>();

const mainStore = useMainStore();

const deleteModal = ref<boolean>(false);

const pageId = computed(() => props.pageData.pageId);
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
    if (item.showChildren) {
      active += item.children.reduce(
        (acc, cur) => (cur.checked ? acc + cur.points : acc),
        0
      );
    } else {
      active += item.checked ? item.points : 0;
    }
  }
  return ((active / (total || 1)) * 100).toFixed(0);
});

const onBlockChange = (changes: object) => {
  const blockId = props.block.blockId;
  const page = mainStore.getPage(pageId.value);
  if (!page) return;

  const blocks = page.blocks.map((block) =>
    block.blockId === blockId ? { ...block, ...changes } : block
  );
  mainStore.editPage({ pageId: page.pageId, blocks });
};

const deleteBlock = () => {
  const blocks = props.pageData.blocks.filter(
    (block) => block.blockId !== props.block.blockId
  );

  mainStore.editPage({ pageId: props.pageData.pageId, blocks });
};

const addItem = () => {
  const blocks = props.pageData.blocks.map((block) => {
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

  mainStore.editPage({ pageId: props.pageData.pageId, blocks });
};

const updateBlockProgress = (newValue: string) => {
  const blocks = props.pageData.blocks.map((block) => {
    if (block.blockId !== props.block.blockId) return block;

    return {
      ...block,
      progress: +newValue,
    };
  });
  mainStore.editPage({ pageId: props.pageData.pageId, blocks });
};

watch(progressBarValue, (value) => {
  updateBlockProgress(value);
});
</script>

<template>
  <section class="page-block">
    <h3 class="page-block__title">
      <AppInput
        class="page-block__title-input"
        :modelValue="block.label"
        @change="(label) => onBlockChange({ label })"
      />

      <Button
        class="page-block__delete-button"
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
      class="page-block__progress"
      :value="progressBarValue"
      width="100%"
      :gradient="['red', 'yellow', 'green', '#0066ff']"
      theme="white"
      disabled
    />

    <DetailPageBlockList
      :pageId="pageId"
      :blockId="block.blockId"
      :list="block.list"
      :mainTheme="mainTheme"
      class="page-block__list"
    />
    <Button label="Добавить пункт" @click="addItem" size="small">
      <AppIcon name="checkmark" :size="14" />
    </Button>
  </section>
</template>

<style scoped lang="scss">
.page-block {
  border-top: 2px solid v-bind(contrastColor);
  margin: 20px 0;
  padding: 20px;

  &:hover {
    .page-block__delete-button {
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
