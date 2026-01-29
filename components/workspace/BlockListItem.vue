<script setup lang="ts">
import type {
  IWorkspaceBlockListItem,
  IWorkspaceBlockListItemProps,
} from "~/types";
import { Button, Checkbox, Slider } from "@featherui";

const props = defineProps<IWorkspaceBlockListItemProps>();
const emit = defineEmits(["openItemSettings", "saveItemChanges"]);

const itemRef = computed(() => props.item);
const sliderMax = computed(() => props.item.tracker?.max);
const sliderOptions = computed<
  { label: number; value: number; color: string }[]
>(() => {
  const result: { label: number; value: number; color: string }[] = [];
  if (!sliderMax.value) return result;

  const step = Math.ceil(sliderMax.value / 5);
  let current = sliderMax.value;

  while (current > 0) {
    result.push({
      label: current,
      value: current,
      color: ["red", "orange", "yellow", "green", "sky"][
        Math.floor(current / step) - 1
      ]!,
    });
    current -= step;
  }

  if (!result.find((item) => !item.label)) {
    result.push({
      label: 0,
      value: 0,
      color: "red",
    });
  }
  return result.reverse();
});
const { pointsProgress, isUpdating, itemChildrenCheckedCount } =
  useBlockListItem(itemRef);

// Local ref for label to avoid prop mutation
const itemLabel = ref(props.item.label);

// Sync local label with prop changes
watch(
  () => props.item.label,
  (newLabel) => {
    if (newLabel !== itemLabel.value) {
      itemLabel.value = newLabel;
    }
  },
  { immediate: true }
);

const onChangeLabel = (newLabel: string) => {
  if (!newLabel || !newLabel.trim()) {
    console.warn("Label cannot be empty");
    return;
  }
  itemLabel.value = newLabel;
  emit(
    "saveItemChanges",
    {
      itemId: props.item.itemId,
      label: newLabel,
    },
    !props.item.children
  );
};

const onChangeChecked = (newValue: boolean) => {
  const item = props.item;
  let isChild = false;
  const changes: Partial<IWorkspaceBlockListItem> = {
    checked: newValue,
    itemId: item.itemId,
  };

  if (item.tracker) {
    changes.tracker = {
      max: item.tracker?.max,
      value: newValue ? item.tracker?.max : 0,
    };
  }

  if (item.children) {
    changes.children = toRaw(item.children).map((child) => ({
      ...child,
      checked: newValue,
    }));
  } else {
    isChild = true;
  }

  emit("saveItemChanges", changes, isChild);
};

const onChangeTracker = (newValue: string | number) => {
  newValue = +newValue;
  if (!props.item.tracker) return;

  const changes: Partial<IWorkspaceBlockListItem> = {
    itemId: props.item.itemId,
    tracker: {
      value: newValue,
      max: props.item.tracker.max,
    },
  };
  if (props.item.tracker.max === newValue) changes.checked = true;
  if (props.item.tracker.max !== newValue && props.item.checked)
    changes.checked = false;

  emit("saveItemChanges", changes, !props.item.children);
};

watch(
  itemChildrenCheckedCount,
  (count) => {
    if (!props.item.showChildren || !props.item.children) return;

    const allChecked = count === props.item.children.length;
    if (allChecked && !props.item.checked) {
      emit("saveItemChanges", {
        itemId: props.item.itemId,
        checked: true,
      });
    } else if (!allChecked && props.item.checked) {
      emit("saveItemChanges", {
        itemId: props.item.itemId,
        checked: false,
      });
    }
  },
  { deep: true }
);
</script>

<template>
  <div
    :class="[
      'workspace-block-list-item',
      {
        '--child': !item.children,
      },
    ]"
  >
    <div class="workspace-block-list-item__content">
      <Button
        v-if="item.children"
        class="workspace-block-list-item__settings"
        iconOnly
        :theme="mainTheme"
        size="small"
        @click="$emit('openItemSettings', item)"
      >
        <AppIcon name="settings" :size="20" />
      </Button>

      <Checkbox
        :modelValue="item.checked"
        :activeTheme="mainTheme"
        class="workspace-block-list-item__checkbox"
        @update:modelValue="onChangeChecked"
      />

      <AppInput
        v-model="itemLabel"
        @change="onChangeLabel"
        class="workspace-block-list-item__input"
      />

      <div v-if="item.tracker" class="workspace-block-list-item__slider">
        <Slider
          :max="item.tracker.max"
          isSmooth
          width="200"
          :options="sliderOptions"
          :modelValue="item.tracker.value"
          @update:modelValue="onChangeTracker"
        />
        <AppInputBordered
          type="number"
          :modelValue="item.tracker.value"
          @update:modelValue="onChangeTracker"
        />
      </div>

      <span
        :class="[
          'workspace-block-list-item__progress',
          {
            '--to': !isUpdating,
            '--from': isUpdating,
          },
        ]"
        :key="pointsProgress"
        >{{ pointsProgress }}</span
      >
    </div>

    <ul
      v-if="item.showChildren && item.children"
      class="workspace-block-list-item__children"
    >
      <li v-for="child of item.children" :key="child.itemId">
        <BlockListItem
          :item="child"
          :mainTheme="mainTheme"
          @saveItemChanges="(...args) => $emit('saveItemChanges', ...args)"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.workspace-block-list-item {
  width: 100%;

  &:hover {
    .workspace-block-list-item__settings {
      opacity: 1;
    }
  }

  &.--child {
    width: calc(100% - 100px);
    margin-left: 100px;
  }

  &__content {
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: -40px;
  }

  &__input {
    width: 100%;
    flex: 1;
  }

  &__slider {
    display: flex;
    gap: 10px;
    margin: 10px 20px;
    font-size: 16px;
  }

  &__settings {
    margin-right: 20px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &__progress {
    font-size: 16px;
    color: $color-grey;

    &.--to {
      animation: fade-to 0.2s;
    }

    &.--from {
      animation: fade-from 0.2s;
    }

    @keyframes fade-to {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes fade-from {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }
}
</style>
