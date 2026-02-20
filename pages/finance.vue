<script setup lang="ts">
import type {
  TChartCircularComponent,
  TChartTwoAxlesComponent,
  TFinancesExpensesHistoryCategory,
} from "~/types";

const financesStore = useFinancesStore();

const chartTwoAxlesComponent = ref<TChartTwoAxlesComponent>("bar");
const chartCircularComponent = ref<TChartCircularComponent>("radar");

const financesStateHistory = computed(() => financesStore.financesStateHistory);
const financesExpensesHistory = computed(
  () => financesStore.financesExpensesHistory
);
chartTwoAxlesComponent.value = financesStateHistory.value.chartType || "bar";
chartCircularComponent.value =
  financesExpensesHistory.value.chartType || "radar";

const twoAxlesChartData = computed(() => {
  const history = financesStateHistory.value;
  if (!history.items) return null;

  return {
    labels: history.items.map((item) => item.dateLabel),
    datasets: [
      {
        label: "Доходы",
        backgroundColor: "#3f3",
        data: history.items.map((item) => item.income),
      },
      {
        label: "Расходы",
        backgroundColor: "red",
        data: history.items.map((item) => item.expense),
      },
      {
        label: "Сбережения",
        backgroundColor: "#09f",
        data: history.items.map((item) => item.savings),
      },
    ],
  };
});

const circularChartData = computed(() => {
  const history = financesExpensesHistory.value;
  if (!history.items) return null;

  const data = [
    {
      label: "Супермаркеты / еда",
      field: "food",
      color: "rgba(0, 145, 255)",
    },
    {
      label: "Общепит",
      field: "publicCatering",
      color: "rgba(0, 43, 255)",
    },
    {
      label: "Жильё",
      field: "housing",
      color: "rgba(255, 0, 0)",
    },
    {
      label: "Для дома",
      field: "forHome",
      color: "rgba(161, 0, 0)",
    },
    {
      label: "Здоровье",
      field: "health",
      color: "rgba(0, 255, 0)",
    },
    {
      label: "Красота",
      field: "beauty",
      color: "rgba(141, 0, 235)",
    },
    {
      label: "Транспорт",
      field: "transport",
      color: "rgba(235, 219, 0)",
    },
    {
      label: "Лекарства",
      field: "medicines",
      color: "rgba(0, 235, 231)",
    },
    {
      label: "Образование",
      field: "education",
      color: "rgba(138, 0, 153)",
    },
    {
      label: "Одежда / обувь",
      field: "clothesAndFootwear",
      color: "rgba(255, 140, 0)",
    },
    {
      label: "Развлечения",
      field: "entertainment",
      color: "rgba(0, 156, 16)",
    },
    {
      label: "Подарки",
      field: "presents",
      color: "rgba(213, 0, 255)",
    },
    {
      label: "Прочее",
      field: "other",
      color: "rgba(143, 143, 143)",
    },
  ];

  return {
    labels: data.map((item) => item.label),
    datasets: data.map((item) => ({
      label: item.label,
      data: history.items.reduce(
        (acc, i) => acc + i[item.field as TFinancesExpensesHistoryCategory],
        0
      ),
      backgroundColor: item.color.replace(")", ", 0.2)"),
      borderColor: item.color,
      pointBackgroundColor: item.color,
      pointBorderColor: "white",
      pointHoverBackgroundColor: "white",
      pointHoverBorderColor: item.color,
      fill: true,
    })),
  };
});

const onToggleChartTwoAxlesComponent = () => {
  chartTwoAxlesComponent.value =
    chartTwoAxlesComponent.value === "bar" ? "line" : "bar";
  financesStore.toggleChartTwoAxlesComponent(chartTwoAxlesComponent.value);
};
const onChangeChartCircularComponent = (newValue: TChartCircularComponent) => {
  chartCircularComponent.value = newValue;
  financesStore.changeChartCircularComponent(chartCircularComponent.value);
};
</script>

<template>
  <article class="finance">
    <section class="finance__money-state">
      <h2 class="finance__title">Доходы и расходы</h2>
      <ChartTwoAxles
        v-if="twoAxlesChartData"
        :component="chartTwoAxlesComponent"
        :chartData="twoAxlesChartData"
      />
      <FinanceMoneyStateData
        :data="financesStateHistory"
        :chartTwoAxlesComponent="chartTwoAxlesComponent"
        @onToggleComponent="onToggleChartTwoAxlesComponent"
      />
    </section>

    <section class="finance__expenses-categories">
      <h2 class="finance__title">Расходы по категориям</h2>
      <ChartCircular
        v-if="circularChartData"
        :component="chartCircularComponent"
        :chartData="circularChartData"
      />
      <FinanceExpensesData
        :data="financesExpensesHistory"
        :circularChartData="circularChartData"
        :chartCircularComponent="chartCircularComponent"
        @onChangeComponent="onChangeChartCircularComponent"
      />
    </section>
  </article>
</template>

<style scoped lang="scss">
.finance {
  &__title {
    margin: 30px;
    text-align: center;
    font-size: 30px;
  }
}
</style>
