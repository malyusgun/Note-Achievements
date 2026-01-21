<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { Modal, Button } from "@featherui";
import icons from "~/assets/icons";
import type { IPageData } from "~/types";

const mainStore = useMainStore();
const { mainTheme, contrastColor } = storeToRefs(mainStore);

const pageCreatorModal = defineModel();

const pageName = ref<string>("");
const pageIconName = ref<string>(Object.keys(icons)[0] || "");

const setPageIconName = (iconName: string) => {
  pageIconName.value = iconName;
};

const createPage = () => {
  const pageId = uuidv4();

  const pageData: IPageData = {
    pageId,
    link: pageId,
    name: pageName.value,
    icon: pageIconName.value,
    blocks: [
      {
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
            children: [
              {
                itemId: uuidv4(),
                label: generateItemLabel(),
                checked: false,
                points: 1,
              },
            ],
          },
        ],
      },
    ],
  };

  mainStore.addPage(pageData);

  pageCreatorModal.value = false;
};
</script>

<template>
  <Modal
    v-model:visible="pageCreatorModal"
    width="30%"
    dismissible
    paddingRightOnActive="0"
  >
    <template #header> Создать страницу</template>

    <div class="page-creator__content">
      <AppInputBordered
        v-model="pageName"
        label="Название"
        placeholder="Тренажёрный зал"
        class="page-creator__name"
      />

      <p class="page-creator__icons-label">Выберите иконку:</p>
      <div class="page-creator__icons">
        <AppIcon
          v-for="icon of Object.entries(icons)"
          :key="icon[0]"
          :class="`page-creator__icon bg-${mainTheme}`"
          :style="`${pageIconName === icon[0] ? `border-color: ${contrastColor}` : ''}`"
          :name="icon[0]"
          @click="setPageIconName(icon[0])"
        ></AppIcon>
      </div>

      <Button
        label="Создать"
        :theme="mainTheme"
        class="page-creator__submit"
        @click="createPage"
      />
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.page-creator {
  &__content {
    width: max-content;

    margin: 0 auto;
  }

  &__name {
    margin-bottom: 20px;
  }

  &__icons-label {
    display: inline-block;
    margin-bottom: 10px;
  }

  &__icons {
    display: grid;
    grid-template-columns: 40px 40px 40px 40px 40px 40px;
    gap: 10px;
    margin-bottom: 20px;
  }

  &__icon {
    width: 40px;
    height: 40px;
    padding: 5px;
    border: 4px solid $color-grey;
    border-radius: 10px;
    cursor: pointer;
  }

  &__submit {
    width: max-content;
  }
}
</style>
