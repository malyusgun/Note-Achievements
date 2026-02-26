<script setup lang="ts">
import { Button, Slider } from "@featherui";
import ExpensesDataItem from "~/components/finance/ExpensesDataItem.vue";
import type {
  ICircularChartData,
  IFinancesExpensesHistory,
  TChartCircularComponent,
} from "~/types";
import { v4 as uuidv4 } from "uuid";

interface IProps {
  data: IFinancesExpensesHistory;
  circularChartData: ICircularChartData | null;
}

const props = defineProps<IProps>();
defineEmits(["onChangeComponent"]);

const userStore = useUserStore();
const financesStore = useFinancesStore();

const mainTheme = computed(() => userStore.mainTheme);
const items = computed(() => financesStore.financesExpensesHistory.items);
const result = computed(() => {
  const data = props.circularChartData?.datasets?.[0]?.data || [];

  return {
    id: "0",
    food: data[0] || 0,
    publicCatering: data[1] || 0,
    housing: data[2] || 0,
    forHome: data[3] || 0,
    health: data[4] || 0,
    beauty: data[5] || 0,
    transport: data[6] || 0,
    medicines: data[7] || 0,
    education: data[8] || 0,
    clothesAndFootwear: data[9] || 0,
    entertainment: data[10] || 0,
    presents: data[11] || 0,
    other: data[12] || 0,
  };
});

const addItem = () => {
  const id = uuidv4();
  financesStore.addFinancesExpensesItem({ id });
};

const onUpdateItem = (newValue: string | number, field: string, id: string) => {
  financesStore.editFinancesExpensesHistory({ id, [field]: newValue });
};
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
      <h3 class="expenses-data__title">Одежда/обувь</h3>
      <h3 class="expenses-data__title">Развлечения</h3>
      <h3 class="expenses-data__title">Подарки</h3>
      <h3 class="expenses-data__title">Прочее</h3>
    </div>

    <ExpensesDataItem :item="result" class="expenses-data__result" />

    <div class="expenses-data__horizontal-line"></div>

    <ExpensesDataItem
      v-for="item of items"
      :key="item.id"
      :item="item"
      @updateItem="onUpdateItem"
      class="expenses-data__item"
    />

    <div class="expenses-data__footer">
      <Button
        label="Добавить запись"
        @click="addItem"
        :theme="mainTheme"
        class="expenses-data__add-button"
      >
        <AppIcon name="badge" :size="20" />
      </Button>
    </div>
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
    min-width: 100px;
    width: 25%;
    text-align: center;
    font-size: 16px;
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

  &__add-button {
    margin-bottom: 20px;
  }

  &__item {
    margin-bottom: 10px;
  }

  &__footer {
    margin: 30px 0;
    display: flex;
    align-items: center;
    gap: 50px;
  }
}
</style>
