import type {
  IFinanceStateHistory,
  IFinanceStateItem,
  TChartTwoAxlesComponent,
} from "~/types";

export const useFinancesStore = defineStore("financesStore", () => {
  const financesStateHistory = ref<IFinanceStateHistory>(
    JSON.parse(localStorage.getItem("finances") || "{}")
  );

  const addFinancesStateItem = (newItem: IFinanceStateItem) => {
    if (!financesStateHistory.value.items)
      financesStateHistory.value.items = [];

    financesStateHistory.value.items.push(newItem);

    localStorage.setItem(
      "finances",
      JSON.stringify(financesStateHistory.value)
    );
  };

  const editFinancesStateHistory = (
    targetItem: Partial<IFinanceStateItem> & { id: string }
  ) => {
    let targetIndex = -1;
    let lastItem: IFinanceStateItem;
    financesStateHistory.value.items = financesStateHistory.value.items.map(
      (item, index) => {
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

        if (targetIndex !== -1 && index > targetIndex) {
          const newFreeMoney =
            lastItem.freeMoney! + (item.income || 0) - (item.expense || 0);

          lastItem = { ...item, freeMoney: newFreeMoney };
          return lastItem;
        }

        lastItem = item;
        return item;
      }
    );

    localStorage.setItem(
      "finances",
      JSON.stringify(financesStateHistory.value)
    );
  };

  const deleteFinancesStateItem = (itemId: string) => {
    financesStateHistory.value.items = financesStateHistory.value.items.filter(
      (item) => {
        return item.id !== itemId;
      }
    );

    localStorage.setItem(
      "finances",
      JSON.stringify(financesStateHistory.value)
    );
  };

  const toggleChartTwoAxlesComponent = (newState: TChartTwoAxlesComponent) => {
    financesStateHistory.value = {
      ...financesStateHistory.value,
      chartType: newState,
    };
    localStorage.setItem(
      "finances",
      JSON.stringify(financesStateHistory.value)
    );
  };

  return {
    financesStateHistory,
    addFinancesStateItem,
    editFinancesStateHistory,
    deleteFinancesStateItem,
    toggleChartTwoAxlesComponent,
  };
});
