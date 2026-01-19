<script setup lang="ts">
import { ProgressBar } from "@featherui";
import type { IPageBlockProps } from "~/types";

defineProps<IPageBlockProps>();

const mainStore = useMainStore();

const mainTheme = computed(() => mainStore.mainTheme);
</script>

<template>
  <section class="page-block">
    <h3 class="page-block__title">{{ block.label }}</h3>

    <ProgressBar
      class="page-block__progress"
      :value="50"
      width="100%"
      :gradient="['red', 'yellow', 'green']"
      theme="white"
    />

    <DetailPageBlockList
      :pageId="pageId"
      :blockId="block.blockId"
      :list="block.list"
      :mainTheme="mainTheme"
      class="page-block__list"
    />
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

  &__progress {
    pointer-events: none;
  }

  &__list {
    margin: 20px 0;
  }
}
</style>
