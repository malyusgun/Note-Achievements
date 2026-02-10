<script setup lang="ts">
import type { TFinanceMoneyChangeDirection } from "~/types";

type TDragAndDropArea = (object & {
  id: string;
})[];

const items = defineModel<TDragAndDropArea>();
const emits = defineEmits(["changeOrder"]);

const targetItemId = ref<string>("");
const topSiblingDist = ref<number>(0);
const bottomSiblingDist = ref<number>(0);
let dragIterations = 0;

const setSiblingsDist = (
  target: Element,
  direction: TFinanceMoneyChangeDirection | null
) => {
  const targetRect = target.getBoundingClientRect();
  const topSibling = target.previousElementSibling;
  const bottomSibling = target.nextElementSibling;
  let topOffset;
  let bottomOffset;

  if (!topSibling) {
    topSiblingDist.value = -9999;
    topOffset = 0;
  } else {
    topOffset = targetRect.top - topSibling.getBoundingClientRect().top;
  }

  if (!bottomSibling) {
    bottomSiblingDist.value = 9999;
    bottomOffset = 0;
  } else {
    bottomOffset =
      bottomSibling.getBoundingClientRect().bottom - targetRect.bottom;
  }

  if (direction === "up") {
    topOffset += bottomOffset;
  } else if (direction === "down") {
    bottomOffset += topOffset;
  }

  const isUp = direction === "up";
  if (topSibling)
    topSiblingDist.value = (topOffset / 2) * (direction && !isUp ? 1 : -1);
  if (bottomSibling)
    bottomSiblingDist.value = (bottomOffset / 2) * (isUp ? -1 : 1);
};
const onDragStart = (e: DragEvent, id: string) => {
  targetItemId.value = id;

  const target = e.target as Element;
  setSiblingsDist(target, null);
};
const onDrag = (e: DragEvent) => {
  if (dragIterations !== 40) {
    dragIterations++;
    return;
  } else {
    dragIterations = 0;
  }

  if (e.offsetY < topSiblingDist.value && items.value) {
    const targetIndex = items.value.findIndex(
      (item) => item.id === targetItemId.value
    );

    if (~targetIndex) {
      // @ts-ignore
      [items.value[targetIndex - 1], items.value[targetIndex]] = [
        items.value[targetIndex],
        items.value[targetIndex - 1],
      ];
      nextTick(() => {
        const target = document.getElementById(targetItemId.value)!;
        setSiblingsDist(target, "up");
        emits("changeOrder", targetItemId.value, items.value, targetIndex - 1);
      });
    }
  }

  if (e.offsetY > bottomSiblingDist.value && items.value) {
    const targetIndex = items.value.findIndex(
      (item) => item.id === targetItemId.value
    );

    if (~targetIndex) {
      // @ts-ignore
      [items.value[targetIndex], items.value[targetIndex + 1]] = [
        items.value[targetIndex + 1],
        items.value[targetIndex],
      ];
      nextTick(() => {
        const target = document.getElementById(targetItemId.value)!;
        setSiblingsDist(target, "down");
        emits("changeOrder", targetItemId.value, items.value, targetIndex);
      });
    }
  }
};
const onDragEnd = (e: DragEvent) => {
  // console.log("e DragEvent: ", e);
};
const onMouseUp = (e: MouseEvent) => {
  // console.log("e MouseEvent: ", e);
};
</script>

<template>
  <ul class="drag-and-drop-area">
    <TransitionGroup name="list">
      <li
        v-for="(item, index) of items"
        :key="item.id"
        :id="item.id"
        class="drag-and-drop-area__item"
        @dragstart="onDragStart($event, item.id)"
        @drag="onDrag"
        @dragend="onDragEnd"
        @pointerup="onMouseUp"
        draggable="true"
      >
        <slot name="item" :item="item" :index="index" />
      </li>
    </TransitionGroup>
  </ul>
</template>

<style scoped lang="scss">
.drag-and-drop-area {
  &__item {
  }
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
</style>
