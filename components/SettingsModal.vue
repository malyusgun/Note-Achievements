<script setup lang="ts">
import { Modal, ToggleSwitch, Button } from "@featherui";
import type { IPageData, TMainTheme } from "~/types";

const route = useRoute();
const router = useRouter();
const mainStore = useMainStore();

const { mainTheme, colorMode, contrastColor, pages } = storeToRefs(mainStore);

const settingsModal = defineModel();

const deleteModal = ref<boolean>(false);
const deletePageData = ref<IPageData | null>(null);

let timerId: number = 0;
const colors: TMainTheme[] = [
  "blue",
  "sky",
  "pink",
  "purple",
  "teal",
  "green",
  "red",
  "orange",
  "yellow",
];

const deleteModalDescription = computed(
  () => `Вы собираетесь удалить страницу "${deletePageData.value?.name}"`
);

const onPageChange = (newName: string, pageId: string) => {
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    mainStore.editPage({ pageId, name: newName });
  }, 500);
};

const openDeleteModal = (page: IPageData) => {
  deletePageData.value = page;
  deleteModal.value = true;
};

const deletePage = () => {
  if (!deletePageData.value) return;

  mainStore.deletePage(deletePageData.value.pageId);
  console.log(
    "route.path, deletePageData.value.link: ",
    route.path,
    deletePageData.value.link
  );
  if (route.name === deletePageData.value.link) {
    router.push({ path: "/" });
  }

  deleteModal.value = false;
};
</script>

<template>
  <Modal
    v-model:visible="settingsModal"
    width="40%"
    dismissible
    paddingRightOnActive="0"
  >
    <template #header> Настройки</template>
    <div class="settings__sections">
      <section class="settings__colors">
        <button
          v-for="color of colors"
          :key="color"
          :class="`settings__color bg-${color}`"
          :style="`${mainTheme === color ? `border-color: ${contrastColor}` : ''}`"
          @click="mainStore.setMainTheme(color)"
        ></button>
        <div class="settings__dark-theme">
          <span>Тёмная тема:</span>
          <ToggleSwitch
            negativeTheme="grey"
            :theme="mainTheme"
            :modelValue="colorMode.value === 'dark'"
            @click="mainStore.toggleColorMode()"
          />
        </div>
      </section>
      <section v-if="pages?.length" class="settings__pages">
        <h3 class="settings__page-title">Страницы:</h3>
        <div class="settings__pages-list">
          <div v-for="page of pages" :key="page.pageId" class="settings__page">
            <AppInputBordered
              class="settings__page-input"
              :modelValue="page.name"
              @change="onPageChange($event, page.pageId)"
            />
            <Button
              iconOnly
              :theme="mainTheme"
              size="small"
              @click="openDeleteModal(page)"
            >
              <AppIcon name="basket" :size="16" />
            </Button>
          </div>
        </div>
      </section>
      <div v-else class="settings__no-pages">Страниц пока нет</div>
    </div>

    <ConfirmDeleteModal
      v-model="deleteModal"
      :description="deleteModalDescription"
      @confirm="deletePage"
    />
  </Modal>
</template>

<style scoped lang="scss">
.settings {
  &__sections {
    margin-top: 20px;
    display: flex;
    gap: 60px;
  }

  &__colors {
    width: max-content;
    display: grid;
    grid-template-columns: 40px 40px 40px;
    gap: 20px 35px;
  }

  &__color {
    width: 40px;
    height: 40px;
    border: 2px solid $color-grey;
    border-radius: 10px;
    cursor: pointer;
  }

  &__dark-theme {
    height: 40px;
    grid-column: 1 / 4;
    display: flex;
    align-items: center;
    gap: 20px;

    span {
      margin-bottom: 3px;
    }
  }

  &__pages-list {
    max-height: 200px;
    padding-right: 20px;
    overflow-y: auto;
  }

  &__page-title {
    margin-bottom: 10px;
  }

  &__page {
    display: flex;
    gap: 10px;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__page-input {
    width: 200px;
  }

  &__no-pages {
    color: $color-grey;
  }
}
</style>
