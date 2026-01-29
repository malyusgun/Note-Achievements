<script setup lang="ts">
import { Modal, ToggleSwitch, Button } from "@featherui";
import type { IWorkspaceData, TMainTheme } from "~/types";

const route = useRoute();
const router = useRouter();
const mainStore = useMainStore();

const { mainTheme, colorMode, contrastColor, workspaces } =
  storeToRefs(mainStore);

const settingsModal = defineModel();

const deleteModal = ref<boolean>(false);
const deleteWorkspaceData = ref<IWorkspaceData | null>(null);

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
  () => `Вы собираетесь удалить страницу "${deleteWorkspaceData.value?.name}"`
);

const onWorkspaceChange = (newName: string, workspaceId: string) => {
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    mainStore.editWorkspace({ workspaceId, name: newName });
  }, 500);
};

const openDeleteModal = (workspace: IWorkspaceData) => {
  deleteWorkspaceData.value = workspace;
  deleteModal.value = true;
};

const deleteWorkspace = () => {
  if (!deleteWorkspaceData.value) return;

  mainStore.deleteWorkspace(deleteWorkspaceData.value.workspaceId);

  if (route.path && route.path.slice(1) === deleteWorkspaceData.value.link) {
    router.push({ path: "/" });
  }

  deleteModal.value = false;
  settingsModal.value = false;
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
      <section v-if="workspaces?.length" class="settings__workspaces">
        <h3 class="settings__workspace-title">Страницы:</h3>
        <div class="settings__workspaces-list">
          <div
            v-for="workspace of workspaces"
            :key="workspace.workspaceId"
            class="settings__workspace"
          >
            <AppInputBordered
              class="settings__workspace-input"
              :modelValue="workspace.name"
              @change="onWorkspaceChange($event, workspace.workspaceId)"
            />
            <Button
              iconOnly
              :theme="mainTheme"
              size="small"
              @click="openDeleteModal(workspace)"
            >
              <AppIcon name="basket" :size="16" />
            </Button>
          </div>
        </div>
      </section>
      <div v-else class="settings__no-workspaces">Страниц пока нет</div>
    </div>

    <ConfirmDeleteModal
      v-model="deleteModal"
      :description="deleteModalDescription"
      @confirm="deleteWorkspace"
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

  &__workspaces-list {
    max-height: 200px;
    padding-right: 20px;
    overflow-y: auto;
  }

  &__workspace-title {
    margin-bottom: 10px;
  }

  &__workspace {
    display: flex;
    gap: 10px;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  &__workspace-input {
    width: 200px;
  }

  &__no-workspaces {
    color: $color-grey;
  }
}
</style>
