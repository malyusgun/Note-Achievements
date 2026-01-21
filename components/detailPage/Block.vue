<script setup lang="ts">
import { Button, ProgressBar } from "@featherui";
import type { IPageBlockProps } from "~/types";
import { v4 as uuidv4 } from "uuid";
import { structuredClone } from "structured-clone-es";

const props = defineProps<IPageBlockProps>();

const mainStore = useMainStore();

const pageId = computed(() => props.pageData.pageId);
const mainTheme = computed(() => mainStore.mainTheme);
const list = computed(() => props.block.list);
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

const addItem = () => {
  const pageData = structuredClone(toRaw(props.pageData));
  const blocks = pageData.blocks.map((block) => {
    if (block.blockId !== props.block.blockId) return block;

    return {
      ...block,
      list: [
        ...block.list,
        {
          itemId: uuidv4(),
          label: "Покушать кашу",
          checked: false,
          points: 1,
          showChildren: false,
          children: [],
        },
      ],
    };
  });

  mainStore.editPage({ pageId: pageData.pageId, blocks });
};
</script>

<template>
  <section class="page-block">
    <h3 class="page-block__title">
      <AppInput
        :modelValue="block.label"
        @change="() => onBlockChange({ label: $event })"
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

  &__title {
    font-size: 28px;
    margin-bottom: 20px;
  }

  &__list {
    margin: 20px 0;
  }
}
</style>
