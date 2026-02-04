import type { IWorkspaceBlockListItem } from "~/types";
import { countItemPoints } from "~/helpers";
import type { EmitFn } from "vue";

/**
 * Composable for block list item calculations and logic
 */
export const useBlockListItem = (
  item: ComputedRef<IWorkspaceBlockListItem>,
  emit: EmitFn<("saveItemChanges" | "openItemSettings")[]>
) => {
  const pointsProgress = ref<string | number>();
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
      return `${countItemPoints(currentItem)}/${currentItem.points}`;

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
    item,
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

      if (!item.value.showChildren || !item.value.children) return;

      const allChecked =
        itemChildrenCheckedCount.value === item.value.children.length;

      if (allChecked && !item.value.checked) {
        emit("saveItemChanges", {
          itemId: item.value.itemId,
          checked: true,
        });
      } else if (!allChecked && item.value.checked) {
        emit("saveItemChanges", {
          itemId: item.value.itemId,
          checked: false,
        });
      }
    },
    { immediate: true, deep: true }
  );

  return {
    pointsProgress,
    isUpdating,
  };
};
