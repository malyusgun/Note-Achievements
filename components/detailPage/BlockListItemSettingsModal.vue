<script setup lang="ts">
import type {
  IPageBlockListItem,
  IPageBlockListItemData,
  IPageBlockListItemSettingsModalProps,
} from "~/types";
import { Button, Modal, ToggleSwitch } from "@featherui";

const props = defineProps<IPageBlockListItemSettingsModalProps>();

const settingsModal = defineModel();
defineEmits(["saveItemChanges"]);

const newItemData = ref<IPageBlockListItem | null>(null);
const itemChildren = ref<IPageBlockListItemData[]>([{
  label: "",
  checked: false,
  points: 1,
}]);

const toggleItemChildren = () => {
  if (!newItemData.value) return;

  if (newItemData.value.children) {
    delete newItemData.value.children;
  } else {
    newItemData.value.children = itemChildren.value;
  }
};

const addChild = () => {
  newItemData.value!.children!.push({
    label: "",
    checked: false,
    points: 1,
  });
};

watch(() => props.item, (item) => {
  if (item) {
    newItemData.value = { ...item };
  }
}, { immediate: true });
</script>

<template>
  <Modal
    v-if="item && newItemData"
    v-model:visible="settingsModal"
    width="40%"
    dismissible
    paddingRightOnActive="8px"
  >
    <template #header>
      Пункт "{{ item.label }}"
    </template>
    <div class="settings">
      <section class="settings__children children">
        <div class="children__toggle">
          <span>Подпункты:</span>
          <ToggleSwitch
            negativeTheme="grey"
            :theme="mainTheme"
            :modelValue="item.children"
            @click="toggleItemChildren"
          />
        </div>

        <div v-show="newItemData?.children">
          <ul class="children__list">
            <li v-for="(child, index) of itemChildren" :key="child.label"
                class="children__item">
              <div class="children__item-number">{{ index + 1 }}).</div>
              <AppInputBordered label="Название:" />
              <AppInputBordered label="Вес:" type="number" />
            </li>
          </ul>

          <Button
            class="children__add-button"
            label="Добавить"
            :theme="mainTheme"
            @click="addChild"
          />
        </div>
      </section>
      <section class="settings__points">
        <AppInputBordered v-model="newItemData.points" label="Вес:" type="number" />
      </section>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.settings {
  display: flex;
  justify-content: space-between;

  &__children {
  }

  .children {
    &__toggle {
      display: flex;
      align-items: center;
      gap: 15px;
      margin: 30px 0;
    }

    &__list {
      margin-bottom: 20px;
    }

    &__item {
      display: flex;
      gap: 15px;
      align-items: center;
      padding-left: 30px;
      margin-bottom: 10px;
      position: relative;
    }

    &__item-number {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }

    &__add-button {
    }
  }
}
</style>