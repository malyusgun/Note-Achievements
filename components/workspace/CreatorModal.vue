<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { Modal, Button } from "@featherui";
import icons from "~/assets/icons";
import type { IWorkspaceData } from "~/types";

const mainStore = useMainStore();
const { mainTheme, contrastColor } = storeToRefs(mainStore);

const workspaceCreatorModal = defineModel();

const workspaceName = ref<string>("");
const workspaceIconName = ref<string>(Object.keys(icons)[0] || "");

const setWorkspaceIconName = (iconName: string) => {
  workspaceIconName.value = iconName;
};

const createWorkspace = () => {
  const workspaceId = uuidv4();

  const workspaceData: IWorkspaceData = {
    workspaceId,
    link: workspaceId,
    name: workspaceName.value,
    icon: workspaceIconName.value,
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

  mainStore.addWorkspace(workspaceData);

  workspaceCreatorModal.value = false;
};
</script>

<template>
  <Modal
    v-model:visible="workspaceCreatorModal"
    width="30%"
    dismissible
    paddingRightOnActive="0"
  >
    <template #header> Создать страницу</template>

    <div class="workspace-creator__content">
      <AppInputBordered
        v-model="workspaceName"
        label="Название"
        placeholder="Тренажёрный зал"
        class="workspace-creator__name"
      />

      <p class="workspace-creator__icons-label">Выберите иконку:</p>
      <div class="workspace-creator__icons">
        <AppIcon
          v-for="icon of Object.entries(icons)"
          :key="icon[0]"
          :class="`workspace-creator__icon bg-${mainTheme}`"
          :style="`${workspaceIconName === icon[0] ? `border-color: ${contrastColor}` : ''}`"
          :name="icon[0]"
          @click="setWorkspaceIconName(icon[0])"
        ></AppIcon>
      </div>

      <Button
        label="Создать"
        :theme="mainTheme"
        class="workspace-creator__submit"
        @click="createWorkspace"
      />
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.workspace-creator {
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
