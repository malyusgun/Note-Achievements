<script setup lang="ts">
import type { IPageBlockListItemProps } from "~/types";
import { Button, Checkbox } from "@featherui";

const props = defineProps<IPageBlockListItemProps>();
const emit = defineEmits(["openItemSettings", "saveItemChanges"]);

const pointsProgress = ref();
const itemChildrenCheckedCount = computed(
  () =>
    props.item.children &&
    props.item.children.filter((child) => child.checked).length
);

const isUpdating = ref(false);

const countPointsProgress = () => {
  const item = props.item;
  if (!item.children) return item.points;
  if (!item.showChildren)
    return `${item.checked ? item.points : 0}/${item.points}`;

  const current = item.children.reduce((acc, child) => {
    if (!child.checked) return acc;
    return acc + child.points;
  }, 0);
  const total = item.children.reduce((acc, child) => acc + child.points, 0);

  return `${current}/${total}`;
};

const onChangeLabel = (newLabel: string) => {
  emit("saveItemChanges", {
    itemId: props.item.itemId,
    label: newLabel,
  });
};

const onChangeChecked = (newValue: boolean) => {
  if (props.item.children) {
    emit("saveItemChanges", {
      checked: newValue,
      itemId: props.item.itemId,
      children: toRaw(props.item.children).map((child) => ({
        ...child,
        checked: newValue,
      })),
    });
  } else {
    console.log("3254346457y");
    emit(
      "saveItemChanges",
      {
        itemId: props.item.itemId,
        checked: newValue,
      },
      true
    );
  }
};

watch(
  itemChildrenCheckedCount,
  (count) => {
    isUpdating.value = true;
    setTimeout(() => {
      pointsProgress.value = countPointsProgress();
      isUpdating.value = false;
    }, 100);

    if (
      props.item.children &&
      count === props.item.children.length &&
      !props.item.checked
    )
      emit("saveItemChanges", {
        itemId: props.item.itemId,
        checked: true,
      });
    if (
      props.item.children &&
      count !== props.item.children.length &&
      props.item.checked
    )
      emit("saveItemChanges", {
        itemId: props.item.itemId,
        checked: false,
      });
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <div
    :class="[
      'page-block-list-item',
      {
        '--child': !item.children,
      },
    ]"
  >
    <div class="page-block-list-item__content">
      <Button
        v-if="item.children"
        class="page-block-list-item__settings"
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
        class="page-block-list-item__checkbox"
        @update:modelValue="onChangeChecked"
      />

      <AppInput
        v-model="item.label"
        @change="onChangeLabel"
        class="page-block-list-item__input"
      />

      <span
        :class="[
          'page-block-list-item__progress',
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
      class="page-block-list-item__children"
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
.page-block-list-item {
  width: 100%;

  &:hover {
    .page-block-list-item__settings {
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

  &__checkbox {
  }

  &__input {
    width: 100%;
    flex: 1;
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
