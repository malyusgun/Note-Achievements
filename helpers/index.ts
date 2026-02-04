import type { IWorkspaceBlockListItemData } from "~/types";

export const countItemPoints = (item: IWorkspaceBlockListItemData): number => {
  if (item.checked) return item.points;
  if (item.tracker)
    return Math.floor((item.points / item.tracker.max) * item.tracker.value);
  return 0;
};
