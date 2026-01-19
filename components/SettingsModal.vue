<script setup lang="ts">
import { Modal, ToggleSwitch } from "@featherui";
import type { TMainTheme } from "~/types";

const mainStore = useMainStore();

const { mainTheme, colorMode, contrastColor } = storeToRefs(mainStore);

const settingsModal = defineModel();
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
</script>

<template>
  <Modal
    v-model:visible="settingsModal"
    width="40%"
    dismissible
    paddingRightOnActive="0"
  >
    <template #header> Настройки </template>
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
      <section class="settings__pages">
        <h3>Список страниц:</h3>
        <template v-for="page of "></template>
      </section>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.settings {
  &__sections {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  &__colors {
    width: max-content;
    display: grid;
    grid-template-columns: 40px 40px 40px;
    gap: 20px 40px;
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
}
</style>
