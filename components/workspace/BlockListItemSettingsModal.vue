<script setup lang="ts">
import type {
  IWorkspaceBlockListItemData,
  IWorkspaceBlockListItemSettingsModalProps,
} from "~/types";
import { Button, Modal, ToggleSwitch } from "@featherui";
import { v4 as uuidv4 } from "uuid";

const props = defineProps<IWorkspaceBlockListItemSettingsModalProps>();

const settingsModal = defineModel();
const emit = defineEmits(["saveChanges", "deleteItem"]);

const itemData = computed({
  get: () => props.item,
  set: () => {
    // Read-only computed, changes are made directly to props.item
    // This is safe because parent already cloned the item
  },
});

const childrenPoints = computed(() => {
  if (!itemData.value?.children) return 0;
  return itemData.value.children.reduce((acc, child) => acc + child.points, 0);
});

watch(
  [() => itemData.value?.showChildren, childrenPoints],
  () => {
    if (!itemData.value) return;
    if (itemData.value.showChildren) {
      itemData.value.points = childrenPoints.value;
    }
  },
  { immediate: true }
);

const addChild = () => {
  if (!itemData.value || !itemData.value.children) return;
  itemData.value.children.push({
    itemId: uuidv4(),
    label: generateItemLabel(),
    checked: false,
    points: 1,
  });
};

const deleteChild = (child: IWorkspaceBlockListItemData) => {
  if (!itemData.value || !itemData.value.children) return;
  itemData.value.children = itemData.value.children.filter(
    (i) => i.itemId !== child.itemId
  );
};

const onChangeShowChildren = (newValue: boolean) => {
  if (!itemData.value) return;

  itemData.value.showChildren = newValue;
  if (newValue) {
    itemData.value.points = childrenPoints.value;
  }
};

const onToggleTracker = () => {
  if (!itemData.value) return;

  if (itemData.value.tracker) {
    delete itemData.value.tracker;
  } else {
    itemData.value.tracker = {
      max: 10,
      value: 0,
    };
  }
};

const onToggleTrackerChild = (childId: string) => {
  if (!itemData.value?.children) return;
  const child = itemData.value.children.find(
    (child) => child.itemId === childId
  );
  if (!child) return;

  if (child.tracker) {
    itemData.value.children = itemData.value.children.map((child) => {
      if (child.itemId !== childId) return child;
      delete child.tracker;
      return child;
    });
  } else {
    itemData.value.children = itemData.value.children.map((child) => {
      if (child.itemId !== childId) return child;
      return {
        ...child,
        tracker: {
          max: 10,
          value: 0,
        },
      };
    });
  }
};

const onSave = () => {
  if (!itemData.value) return;

  if (itemData.value.showChildren && itemData.value.tracker)
    delete itemData.value.tracker;
  emit("saveChanges", itemData.value);
  settingsModal.value = false;
};

const deleteItem = () => {
  if (!props.item?.itemId) return;
  emit("deleteItem", props.item.itemId);
  settingsModal.value = false;
};
</script>

<template>
  <Modal
    v-model:visible="settingsModal"
    width="800px"
    dismissible
    paddingRightOnActive="0"
  >
    <template #header> Пункт "{{ itemData?.label }}"</template>
    <div class="settings">
      <div class="settings__content">
        <section class="settings__children children">
          <div class="children__toggle">
            <span>Подпункты:</span>
            <ToggleSwitch
              negativeTheme="grey"
              :theme="mainTheme"
              :modelValue="itemData?.showChildren"
              @update:modelValue="onChangeShowChildren"
            />
          </div>

          <ul v-show="itemData?.showChildren" class="children__list">
            <li
              v-for="(child, index) of itemData?.children"
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
              <div class="children__item-tracker">
                <p class="children__item-tracker-label">Трекер:</p>
                <ToggleSwitch
                  negativeTheme="grey"
                  :theme="mainTheme"
                  :modelValue="child?.tracker"
                  @update:modelValue="onToggleTrackerChild(child.itemId)"
                />
              </div>
              <AppInputBordered
                v-if="child?.tracker"
                label="Всего:"
                type="number"
                :modelValue="child.tracker.max"
                @update:modelValue="child.tracker.max = $event"
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
        </section>

        <section v-if="itemData?.points" class="settings__common common">
          <AppInputBordered
            v-model="itemData.points"
            label="Вес:"
            type="number"
            :disabled="itemData?.showChildren"
          />
          <div v-if="!itemData?.showChildren" class="tracker">
            <p class="tracker-label">Трекер:</p>
            <ToggleSwitch
              negativeTheme="grey"
              :theme="mainTheme"
              :modelValue="itemData?.tracker"
              @update:modelValue="onToggleTracker"
            />
          </div>
          <AppInputBordered
            v-if="itemData?.tracker && !itemData?.showChildren"
            label="Всего:"
            type="number"
            :modelValue="itemData.tracker.max"
            @update:modelValue="itemData.tracker.max = $event"
          />
        </section>
      </div>

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
          v-show="itemData?.showChildren"
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
  </Modal>
</template>

<style scoped lang="scss">
.settings {
  &__content {
    display: flex;
    justify-content: space-between;
  }

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

    &__item-tracker {
      margin-bottom: 8px;
    }

    &__item-tracker-label {
      margin-bottom: 10px;
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

  &__common {
    display: flex;
    flex-direction: row-reverse;
    gap: 15px;
  }

  .common {
    height: max-content;
  }

  .tracker {
    &-label {
      margin-bottom: 10px;
    }
  }
}
</style>
