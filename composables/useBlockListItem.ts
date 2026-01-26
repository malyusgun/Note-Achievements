import type { IPageBlockListItem } from "~/types";

/**
 * Composable for block list item calculations and logic
 */
export const useBlockListItem = (item: ComputedRef<IPageBlockListItem>) => {
  const pointsProgress = ref<string | number>(0);
  const isUpdating = ref(false);

  const itemChildrenCheckedCount = computed(
    () =>
      item.value.children &&
      item.value.children.filter((child) => child.checked).length
  );

  const countPointsProgress = (): string | number => {
    const currentItem = item.value;
    if (!currentItem.children) return currentItem.points;
    if (!currentItem.showChildren)
      return `${currentItem.checked ? currentItem.points : 0}/${currentItem.points}`;

    const current = currentItem.children.reduce((acc, child) => {
      if (!child.checked) return acc;
      return acc + child.points;
    }, 0);
    const total = currentItem.children.reduce(
      (acc, child) => acc + child.points,
      0
    );

    return `${current}/${total}`;
  };

  // Update points progress when item changes
  watch(
    () => item.value.points,
    () => {
      pointsProgress.value = countPointsProgress();
    },
    { immediate: true }
  );

  // Update points progress when children checked state changes
  watch(
    itemChildrenCheckedCount,
    () => {
      isUpdating.value = true;
      setTimeout(() => {
        pointsProgress.value = countPointsProgress();
        isUpdating.value = false;
      }, 100);
    },
    { immediate: true, deep: true }
  );

  return {
    pointsProgress,
    isUpdating,
    itemChildrenCheckedCount,
    countPointsProgress,
  };
};
