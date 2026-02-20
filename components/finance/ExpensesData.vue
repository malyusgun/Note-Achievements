<script setup lang="ts">
import ExpensesDataItem from "~/components/finance/ExpensesDataItem.vue";
import type { ICircularChartData, IFinancesExpensesHistory } from "~/types";

interface IProps {
  data: IFinancesExpensesHistory;
  circularChartData: ICircularChartData | null;
}

const props = defineProps<IProps>();
defineEmits(["onChangeComponent"]);

const result = computed(() => {
  const datasets = props.circularChartData?.datasets;

  return {
    food:
      datasets?.find((item) => item.label === "Супермаркеты / еда")?.data || 0,
    publicCatering:
      datasets?.find((item) => item.label === "Общепит")?.data || 0,
    housing: datasets?.find((item) => item.label === "Жильё")?.data || 0,
    forHome: datasets?.find((item) => item.label === "Для дома")?.data || 0,
    health: datasets?.find((item) => item.label === "Здоровье")?.data || 0,
    beauty: datasets?.find((item) => item.label === "Красота")?.data || 0,
    transport: datasets?.find((item) => item.label === "Транспорт")?.data || 0,
    medicines: datasets?.find((item) => item.label === "Лекарства")?.data || 0,
    education:
      datasets?.find((item) => item.label === "Образование")?.data || 0,
    clothesAndFootwear:
      datasets?.find((item) => item.label === "Одежда / обувь")?.data || 0,
    entertainment:
      datasets?.find((item) => item.label === "Развлечения")?.data || 0,
    presents: datasets?.find((item) => item.label === "Подарки")?.data || 0,
    other: datasets?.find((item) => item.label === "Прочее")?.data || 0,
  };
});
</script>

<template>
  <div class="expenses-data">
    <div class="expenses-data__header">
      <h3 class="expenses-data__title">Супермаркеты</h3>
      <h3 class="expenses-data__title">Общепит</h3>
      <h3 class="expenses-data__title">Жильё</h3>
      <h3 class="expenses-data__title">Для дома</h3>
      <h3 class="expenses-data__title">Здоровье</h3>
      <h3 class="expenses-data__title">Красота</h3>
      <h3 class="expenses-data__title">Транспорт</h3>
      <h3 class="expenses-data__title">Лекарства</h3>
      <h3 class="expenses-data__title">Образование</h3>
      <h3 class="expenses-data__title">Одежда / обувь</h3>
      <h3 class="expenses-data__title">Развлечения</h3>
      <h3 class="expenses-data__title">Подарки</h3>
      <h3 class="expenses-data__title">Прочее</h3>
    </div>

    <ExpensesDataItem :item="result" class="expenses-data__result" />

    <div class="expenses-data__horizontal-line"></div>
  </div>
</template>

<style scoped lang="scss">
.expenses-data {
  overflow-x: auto;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    min-width: 150px;
    width: 25%;
    text-align: center;
  }

  &__horizontal-line {
    width: 100%;
    height: 1px;
    margin: 20px 0;
    background-color: $color-grey;
  }

  &__result {
    pointer-events: none;
  }
}
</style>
