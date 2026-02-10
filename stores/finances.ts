import type {
  IFinanceStateHistory,
  IFinanceStateItem,
  TChartTwoAxlesComponent,
  TFinanceMoneyChangeDirection,
} from "~/types";
import { useFinancesUpdater } from "~/helpers";

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
    const financesUpdater = useFinancesUpdater();
    financesStateHistory.value.items = financesStateHistory.value.items.map(
      (item, index) => financesUpdater(item, targetItem, index)
    );

    localStorage.setItem(
      "finances",
      JSON.stringify(financesStateHistory.value)
    );
  };

  const changeFinancesStateHistoryOrder = (
    targetItem: Partial<IFinanceStateItem> & {
      id: string;
    },
    newState: IFinanceStateItem[],
    targetIndex: number
  ) => {
    financesStateHistory.value.items = newState;
    console.log("newState, targetIndex: ", newState, targetIndex);
    const financesUpdater = useFinancesUpdater(targetIndex);
    financesStateHistory.value.items = financesStateHistory.value.items.map(
      (item, index) => financesUpdater(item, targetItem, index)
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
    changeFinancesStateHistoryOrder,
    deleteFinancesStateItem,
    toggleChartTwoAxlesComponent,
  };
});
