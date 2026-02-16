import type { IWorkspaceBlockListItemData } from "~/types";

export const countItemPoints = (
  item: IWorkspaceBlockListItemData,
  isFloor: boolean = false
): number => {
  if (item.checked) return item.points;

  if (item.tracker) {
    if (!isFloor) {
      return (item.points / item.tracker.max) * item.tracker.value;
    } else {
      return Math.floor((item.points / item.tracker.max) * item.tracker.value);
    }
  }
  return 0;
};
