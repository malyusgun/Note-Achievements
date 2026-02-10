import type { IFinanceStateItem, IWorkspaceBlockListItemData } from "~/types";

export const countItemPoints = (item: IWorkspaceBlockListItemData): number => {
  if (item.checked) return item.points;
  if (item.tracker)
    return Math.floor((item.points / item.tracker.max) * item.tracker.value);
  return 0;
};

export const useFinancesUpdater = (targetIndexInit: number = -1) => {
  let targetIndex = targetIndexInit;
  let lastItem: IFinanceStateItem | null = null;

  return (
    item: IFinanceStateItem,
    targetItem: Partial<IFinanceStateItem> & { id: string },
    index: number
  ) => {
    if (item.id === targetItem.id) {
      targetIndex = index;

      if (targetItem.freeMoney) return { ...item, ...targetItem };

      lastItem = {
        ...item,
        ...targetItem,
        freeMoney:
          (lastItem?.freeMoney || 0) +
          (targetItem.income || item.income || 0) -
          (targetItem.expense || item.expense || 0),
      };
      return lastItem;
    }

    if (targetIndex !== -1 && index >= targetIndex) {
      const newFreeMoney =
        (lastItem?.freeMoney || 0) + (item.income || 0) - (item.expense || 0);

      lastItem = { ...item, freeMoney: newFreeMoney };
      return lastItem;
    }

    lastItem = item;
    return item;
  };
};
