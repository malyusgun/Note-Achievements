<script setup lang="ts">
import { Button } from "@featherui";
import { v4 as uuidv4 } from "uuid";

const mainStore = useMainStore();
const route = useRoute();

const pageData = computed(() => mainStore.getPage(route.params.id as string));
const mainTheme = computed(() => mainStore.mainTheme);
const contrastColor = computed(() => mainStore.contrastColor);

const addBlock = () => {
  if (!pageData.value) return;

  pageData.value.blocks.push({
    blockId: uuidv4(),
    label: "Название блока",
    progress: 0,
    list: [
      {
        itemId: uuidv4(),
        label: "Покушать кашу",
        checked: false,
        points: 1,
        showChildren: false,
        children: [],
      },
    ],
  });
};
</script>

<template>
  <article v-if="pageData" class="detail-page">
    <h1 class="detail-page__title">{{ pageData.name }}</h1>

    <template v-for="block of pageData.blocks">
      <DetailPageBlock :pageId="pageData.pageId" :block="block" :contrastColor="contrastColor" />
    </template>

    <Button label="Добавить блок" @click="addBlock" :theme="mainTheme" />

    <pre style="margin-top: 100px">{{ pageData }}</pre>
  </article>
</template>

<style scoped lang="scss">
.detail-page {
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
