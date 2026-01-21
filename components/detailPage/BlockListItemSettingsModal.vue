<script setup lang="ts">
import type {
  IPageBlockListItem,
  IPageBlockListItemData,
  IPageBlockListItemSettingsModalProps,
} from "~/types";
import { Button, Modal, ToggleSwitch } from "@featherui";
import { v4 as uuidv4 } from "uuid";

const props = defineProps<IPageBlockListItemSettingsModalProps>();

const settingsModal = defineModel();
const emit = defineEmits(["saveChanges", "deleteItem"]);

const newItemData = ref<Required<IPageBlockListItem> | null>(null);

const addChild = () => {
  newItemData.value!.children.push({
    itemId: uuidv4(),
    label: "Поспать",
    checked: false,
    points: 1,
  });
};

const deleteChild = (child: IPageBlockListItemData) => {
  newItemData.value!.children = newItemData.value!.children.filter(
    (i) => i.itemId !== child.itemId
  );
};

const onChangeShowChildren = (newValue: boolean) => {
  if (!newItemData.value) return;

  newItemData.value.showChildren = newValue;
  newItemData.value.points = newItemData.value.children.reduce(
    (acc, child) => acc + child.points,
    0
  );
};

const onSave = () => {
  emit("saveChanges", newItemData.value);
  settingsModal.value = false;
};

const deleteItem = () => {
  emit("deleteItem", props.item?.itemId);
  settingsModal.value = false;
};

watch(
  settingsModal,
  () => {
    if (props.item) {
      console.log("props.item", props.item);
      newItemData.value = structuredClone(toRaw(props.item));
    }
  },
  { immediate: true }
);

watch(
  () => newItemData.value?.children,
  (children) => {
    if (!children || !newItemData.value) return;

    newItemData.value.points = children.reduce(
      (acc, child) => acc + child.points,
      0
    );
  },
  { deep: true }
);
</script>

<template>
  <Modal
    v-if="item && newItemData"
    v-model:visible="settingsModal"
    width="40%"
    dismissible
    paddingRightOnActive="0"
  >
    <template #header> Пункт "{{ item.label }}"</template>
    <div class="settings">
      <section class="settings__children children">
        <div class="children__toggle">
          <span>Подпункты:</span>
          <ToggleSwitch
            negativeTheme="grey"
            :theme="mainTheme"
            :modelValue="newItemData.showChildren"
            @update:modelValue="onChangeShowChildren"
          />
        </div>

        <div>
          <ul v-show="newItemData?.showChildren" class="children__list">
            <li
              v-for="(child, index) of newItemData.children"
              :key="child.itemId"
              class="children__item"
            >
              <div class="children__item-number">{{ index + 1 }}).</div>
              <AppInputBordered
                label="Название:"
                :modelValue="child.label"
                @update:modelValue="child.label = $event"
              />
              <AppInputBordered
                label="Вес:"
                type="number"
                :modelValue="child.points"
                @update:modelValue="child.points = $event"
              />
              <Button
                iconOnly
                :theme="mainTheme"
                size="small"
                @click="deleteChild(child)"
              >
                <AppIcon name="basket" :size="18" />
              </Button>
            </li>
          </ul>

          <div class="children__buttons">
            <Button
              class="children__save-button"
              label="Сохранить"
              :theme="mainTheme === 'green' ? 'sky' : 'green'"
              @click="onSave"
            >
              <AppIcon name="save" :size="16" />
            </Button>

            <Button
              v-show="newItemData?.showChildren"
              class="children__add-button"
              label="Добавить"
              :theme="mainTheme"
              @click="addChild"
            >
              <AppIcon name="plus" :size="16" />
            </Button>

            <Button
              class="children__save-button"
              label="Удалить пункт"
              theme="red"
              @click="deleteItem"
            >
              <AppIcon name="basket" :size="16" />
            </Button>
          </div>
        </div>
      </section>
      <section class="settings__points">
        <AppInputBordered
          v-model="newItemData.points"
          label="Вес:"
          type="number"
          :disabled="newItemData.showChildren"
        />
      </section>
    </div>
  </Modal>
</template>

<style scoped lang="scss">
.settings {
  display: flex;
  justify-content: space-between;

  &__children {
    flex: 1;
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
      align-items: end;
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

    &__buttons {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
