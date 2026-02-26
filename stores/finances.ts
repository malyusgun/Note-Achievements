import type {
  IFinancesExpensesHistory,
  IFinanceStateHistory,
  IFinanceStateItem,
  TChartCircularComponent,
  TChartTwoAxlesComponent,
  TFinancesExpensesDataItem,
} from "~/types";
import { useFinancesUpdater } from "~/helpers";

export const useFinancesStore = defineStore("financesStore", () => {
  const financesStateHistory = ref<IFinanceStateHistory>(
    JSON.parse(localStorage.getItem("finances") || "{}")
  );
  const financesExpensesHistory = ref<IFinancesExpensesHistory>(
    JSON.parse(localStorage.getItem("financesExpenses") || "{}")
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

  const addFinancesExpensesItem = (
    newItem: Partial<TFinancesExpensesDataItem> & { id: string }
  ) => {
    if (!financesExpensesHistory.value.items)
      financesExpensesHistory.value.items = [];

    financesExpensesHistory.value.items.push(newItem);

    localStorage.setItem(
      "financesExpenses",
      JSON.stringify(financesExpensesHistory.value)
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

  const editFinancesExpensesHistory = (
    targetItem: Partial<TFinancesExpensesDataItem> & { id: string }
  ) => {
    financesExpensesHistory.value.items =
      financesExpensesHistory.value.items.map((item) => {
        if (targetItem.id !== item.id) return item;
        return { ...item, ...targetItem };
      });

    localStorage.setItem(
      "financesExpenses",
      JSON.stringify(financesExpensesHistory.value)
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

    const financesUpdater = useFinancesUpdater(targetIndex);

    financesStateHistory.value.items = financesStateHistory.value.items.map(
      (item, index) => financesUpdater(item, targetItem, index)
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

  const changeChartCircularComponent = (newState: TChartCircularComponent) => {
    financesExpensesHistory.value = {
      ...financesExpensesHistory.value,
      chartType: newState,
    };
    localStorage.setItem(
      "financesExpenses",
      JSON.stringify(financesExpensesHistory.value)
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

  return {
    financesStateHistory,
    financesExpensesHistory,
    addFinancesStateItem,
    addFinancesExpensesItem,
    editFinancesStateHistory,
    editFinancesExpensesHistory,
    changeFinancesStateHistoryOrder,
    toggleChartTwoAxlesComponent,
    changeChartCircularComponent,
    deleteFinancesStateItem,
  };
});
