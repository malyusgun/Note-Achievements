<script setup lang="ts">
import { Button, ToggleSwitch } from "@featherui";
import { v4 as uuidv4 } from "uuid";
import type { IMoneyStateDataProps } from "~/types/props";
import DragAndDropArea from "~/components/DragAndDropArea.vue";
import type { IFinanceStateItem, TFinanceMoneyChangeDirection } from "~/types";

const financesStore = useFinancesStore();
const userStore = useUserStore();
const props = defineProps<IMoneyStateDataProps>();
defineEmits(["onToggleComponent"]);

const deleteModal = ref<boolean>(false);
const itemToDelete = ref<IFinanceStateItem | null>(null);

const deleteModalDescription = computed(
  () =>
    `Вы собираетесь удалить элемент с датой "${itemToDelete.value?.dateLabel}"`
);
const data = computed(() => props.data);
const itemsDynamicsChangesFreeMoney = computed(() => {
  const items = data.value.items;
  if (!items[0]) return [];

  const result: (null | number)[] = [null];
  let lastFreeMoneyValue: number = items[0].savings || 0;

  items.slice(1).forEach((item) => {
    result.push((item.savings || 0) - lastFreeMoneyValue);
    lastFreeMoneyValue = item.savings || 0;
  });

  return result;
});
const mainTheme = computed(() => userStore.mainTheme);

const addItem = () => {
  const newItem = {
    id: uuidv4(),
    income: null,
    expense: null,
    savings: null,
    dateLabel: "",
  };
  financesStore.addFinancesStateItem(newItem);
};

const onUpdateItem = (newValue: string | number, field: string, id: string) => {
  financesStore.editFinancesStateHistory({ id, [field]: newValue });
};
const onChangeFinanceMoneyOrder = (
  itemId: string,
  newStateHistory: IFinanceStateItem[],
  targetIndex: number
) =>
  financesStore.changeFinancesStateHistoryOrder(
    { id: itemId },
    newStateHistory,
    targetIndex
  );
const onDeleteItem = () => {
  financesStore.deleteFinancesStateItem(itemToDelete.value!.id);
  deleteModal.value = false;
};
const openDeleteModal = (item: IFinanceStateItem) => {
  itemToDelete.value = item;
  deleteModal.value = true;
};
</script>

<template>
  <div class="money-state-data">
    <div v-if="data.items?.length" class="money-state-data__header">
      <h3 class="money-state-data__title">Даты</h3>
      <h3 class="money-state-data__title">Доходы</h3>
      <h3 class="money-state-data__title">Расходы</h3>
      <h3 class="money-state-data__title">Сбережения</h3>
    </div>

    <DragAndDropArea
      v-model="data.items"
      class="money-state-data__list"
      @changeOrder="onChangeFinanceMoneyOrder"
    >
      <template #item="{ item, index }">
        <FinanceMoneyStateDataItem
          :item="item as IFinanceStateItem"
          :dynamic="itemsDynamicsChangesFreeMoney[index]!"
          :mainTheme="mainTheme"
          @updateItem="onUpdateItem"
          @openDeleteModal="openDeleteModal"
          class="money-state-data__item"
        />
      </template>
    </DragAndDropArea>

    <div class="money-state-data__footer">
      <Button label="Добавить запись" @click="addItem" :theme="mainTheme">
        <AppIcon name="badge" :size="20" />
      </Button>
      <div class="money-state-data__mode-container">
        <span class="money-state-data__mode">Line mode</span>
        <ToggleSwitch
          :negativeTheme="mainTheme === 'blue' ? 'green' : 'blue'"
          :theme="mainTheme"
          :modelValue="chartTwoAxlesComponent === 'bar'"
          @update:modelValue="$emit('onToggleComponent')"
        />
        <span class="money-state-data__mode">Bar mode</span>
      </div>
    </div>

    <ConfirmDeleteModal
      v-model="deleteModal"
      :description="deleteModalDescription"
      @confirm="onDeleteItem"
    />
  </div>
</template>

<style scoped lang="scss">
.money-state-data {
  overflow-x: auto;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    min-width: 250px;
    width: 25%;
    text-align: center;
  }

  &__footer {
    margin: 30px 0;
    display: flex;
    align-items: center;
    gap: 50px;
  }

  &__mode-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__mode {
    font-size: 1rem;
  }
}
</style>
