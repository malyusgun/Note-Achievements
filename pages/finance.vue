<script setup lang="ts">
import type { TChartTwoAxlesComponent } from "~/types";

const financesStore = useFinancesStore();

const chartTwoAxlesComponent = ref<TChartTwoAxlesComponent>("bar");

const financesStateHistory = computed(() => financesStore.financesStateHistory);
chartTwoAxlesComponent.value = financesStateHistory.value.chartType || "bar";

const chartData = computed(() => {
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

const onToggleChartTwoAxlesComponent = () => {
  chartTwoAxlesComponent.value =
    chartTwoAxlesComponent.value === "bar" ? "line" : "bar";
  financesStore.toggleChartTwoAxlesComponent(chartTwoAxlesComponent.value);
};
</script>

<template>
  <article class="finance">
    <section class="finance__money-state">
      <h2 class="finance__title">Доходы и расходы</h2>
      <ChartTwoAxles
        v-if="chartData"
        :component="chartTwoAxlesComponent"
        :chartData="chartData"
      />
      <FinanceMoneyStateData
        :data="financesStateHistory"
        :chartTwoAxlesComponent="chartTwoAxlesComponent"
        @onToggleComponent="onToggleChartTwoAxlesComponent"
      />
    </section>

    <section class="finance__spending-categories">
      <h2 class="finance__title">Расходы по категориям</h2>
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
