<script setup lang="ts">
type TDragAndDropArea = (object & {
  id: string;
})[];

const items = defineModel<TDragAndDropArea>();

const targetItemId = ref<string>();
const topSiblingDist = ref<number>(0);
const bottomSiblingDist = ref<number>(0);
let dragIterations = 0;

const setSiblingsDist = (target: Element, direction: "up" | "down" | null) => {
  const topSibling = target.previousElementSibling;
  const bottomSibling = target.nextElementSibling;
  let topOffset;
  let bottomOffset;

  if (!topSibling) {
    topSiblingDist.value = -9999;
    topOffset = 0;
  } else {
    console.log(topSibling, target, bottomSibling);
    topOffset =
      target.getBoundingClientRect().top -
      topSibling.getBoundingClientRect().top;
    console.log(
      target.getBoundingClientRect().top,
      topSibling.getBoundingClientRect().top
    );
  }

  if (!bottomSibling) {
    bottomSiblingDist.value = 9999;
    bottomOffset = 0;
  } else {
    bottomOffset =
      bottomSibling.getBoundingClientRect().bottom -
      target.getBoundingClientRect().bottom;
    console.log(
      bottomSibling.getBoundingClientRect().bottom,
      target.getBoundingClientRect().bottom
    );
  }
  console.log("1 bottomOffset, topOffset: ", bottomOffset, topOffset);
  if (direction === "up") {
    topOffset += bottomOffset;
  } else if (direction === "down") {
    bottomOffset += topOffset;
  }
  console.log("2 bottomOffset: ", bottomOffset);
  if (topSibling)
    topSiblingDist.value = (topOffset / -2) * (direction === "down" ? -1 : 1);
  if (bottomSibling)
    bottomSiblingDist.value =
      (bottomOffset / 2) * (direction === "up" ? -1 : 1);
  console.log(topSiblingDist.value, bottomSiblingDist.value);
};
const onDragStart = (e: DragEvent, id: string) => {
  console.log("e onDragStart: ", e);
  targetItemId.value = id;

  const target = e.target as Element;

  setSiblingsDist(target, null);
};
const onDrag = (e: DragEvent) => {
  if (dragIterations !== 10) {
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
        console.log("-----up-------");
        const target = document.getElementById(targetItemId.value!)!;
        setSiblingsDist(target, "up");
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
        console.log("-----down-------");
        const target = document.getElementById(targetItemId.value!)!;
        console.log(target);
        setSiblingsDist(target, "down");
      });
    }
  }
};
const onDragEnd = (e: DragEvent) => {
  console.log("e DragEvent: ", e);
};
const onMouseUp = (e: MouseEvent) => {
  console.log("e MouseEvent: ", e);
};
</script>

<template>
  {{ topSiblingDist }}
  {{ bottomSiblingDist }}
  <ul class="drag-and-drop-area">
    <TransitionGroup name="list">
      <li
        v-for="item of items"
        :key="item.id"
        :id="item.id"
        class="drag-and-drop-area__item"
        @dragstart="onDragStart($event, item.id)"
        @drag="onDrag"
        @dragend="onDragEnd"
        @pointerup="onMouseUp"
        draggable="true"
      >
        <slot name="item" :item="item" />
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
