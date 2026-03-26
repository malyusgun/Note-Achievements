<script setup lang="ts">
import type {
  TChartCircularComponent,
  TChartTwoAxlesComponent,
  TFinancesExpensesHistoryCategory,
} from "~/types";
import { ToggleSwitch, Slider } from "@featherui";

const financesStore = useFinancesStore();
const userStore = useUserStore();

const chartTwoAxlesComponent = ref<TChartTwoAxlesComponent>("bar");
const chartCircularComponent = ref<TChartCircularComponent>("radar");

const mainTheme = computed(() => userStore.mainTheme);
const financesStateHistory = computed(() => financesStore.financesStateHistory);
const financesExpensesHistory = computed(
  () => financesStore.financesExpensesHistory
);
chartTwoAxlesComponent.value = financesStateHistory.value.chartType || "bar";
chartCircularComponent.value =
  financesExpensesHistory.value.chartType || "radar";

const circularModeSliderOptions = [
  {
    label: "Radar",
    value: "radar",
    color: "red",
  },
  {
    label: "Doughnut",
    value: "doughnut",
    color: "green",
  },
  {
    label: "PolarArea",
    value: "polarArea",
    color: "blue",
  },
];

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

  const keys = Object.keys(history.items[0]!);
  const datasetsData: number[] = [];

  for (const key of keys) {
    if (key === "id") continue;
    let length = 0;
    datasetsData.push(
      history.items.reduce((acc, cur) => {
        const value: number | undefined =
          cur[key as TFinancesExpensesHistoryCategory];
        if (typeof value === "number") length++;
        return acc + (value || 0);
      }, 0) / length
    );
  }

  if (!history.chartType || history.chartType === "radar") {
    return {
      labels: data.map((item) => item.label),
      datasets: [
        {
          label: "Среднее",
          data: datasetsData,
          backgroundColor: "rgba(0, 145, 255, 0.2)",
          borderColor: "rgba(0, 145, 255)",
          pointBackgroundColor: "rgba(0, 145, 255)",
          pointBorderColor: "white",
          pointHoverBackgroundColor: "white",
          pointHoverBorderColor: "rgba(0, 145, 255)",
          fill: true,
        },
      ],
    };
  }

  return {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: datasetsData,
        backgroundColor: data.map((item) => item.color),
      },
    ],
  };
});

const onToggleChartTwoAxlesComponent = () => {
  chartTwoAxlesComponent.value =
    chartTwoAxlesComponent.value === "bar" ? "line" : "bar";
  financesStore.toggleChartTwoAxlesComponent(chartTwoAxlesComponent.value);
};
const onChangeChartCircularComponent = (newValue: TChartCircularComponent) => {
  chartCircularComponent.value = newValue;
  console.log("newValue: ", newValue);
  financesStore.changeChartCircularComponent(chartCircularComponent.value);
};
</script>

<template>
  <article class="finance">
    <section class="finance__money-state">
      <h2 class="finance__title">Доходы и расходы</h2>

      <div class="finance__mode-container">
        <span class="finance__mode">Line mode</span>
        <ToggleSwitch
          :negativeTheme="mainTheme === 'blue' ? 'green' : 'blue'"
          :theme="mainTheme"
          :modelValue="chartTwoAxlesComponent === 'bar'"
          @update:modelValue="onToggleChartTwoAxlesComponent"
        />
        <span class="finance__mode">Bar mode</span>
      </div>

      <ChartTwoAxles
        v-if="twoAxlesChartData"
        :component="chartTwoAxlesComponent"
        :chartData="twoAxlesChartData"
      />

      <FinanceMoneyStateData
        :mainTheme="mainTheme"
        :data="financesStateHistory"
      />
    </section>

    <section class="finance__expenses-categories">
      <h2 class="finance__title">Расходы по категориям</h2>

      <div class="finance__mode-container">
        <Slider
          v-if="circularChartData"
          max="2"
          isSmooth
          width="200"
          isValueEqualOption
          backgroundColor="green"
          theme="blue"
          :options="circularModeSliderOptions"
          :modelValue="financesExpensesHistory.chartType"
          @update:modelValue="onChangeChartCircularComponent"
        />
      </div>

      <ChartCircular
        v-if="circularChartData"
        :component="chartCircularComponent"
        :chartData="circularChartData"
        class="finance__circular-chart"
      />

      <FinanceExpensesData
        :data="financesExpensesHistory"
        :circularChartData="circularChartData"
        :chartCircularComponent="chartCircularComponent"
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

  &__mode-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__mode {
    font-size: 1rem;
  }

  &__circular-chart {
    max-width: 30%;
    margin-bottom: 20px;
  }
}
</style>
