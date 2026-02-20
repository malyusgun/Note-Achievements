<script setup lang="ts">
import type { TFinancesExpensesDataItem } from "~/types";

interface IProps {
  item: TFinancesExpensesDataItem;
}

const props = defineProps<IProps>();
const emits = defineEmits(["updateItem"]);

const onChange = (newValue: number, field: string) => {
  emits("updateItem", { ...props.item, [field]: newValue });
};
</script>

<template>
  <div class="expenses-data-item">
    <AppInputBordered
      :modelValue="item.food"
      placeholder="Супермаркеты"
      type="number"
      @change="onChange($event, 'food')"
    />
    <AppInputBordered
      :modelValue="item.publicCatering"
      placeholder="Общепит"
      type="number"
      @change="onChange($event, 'publicCatering')"
    />
  </div>
</template>

<style scoped lang="scss">
.expenses-data-item {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;

  :deep(.input__input) {
    min-width: 150px;
  }
}
</style>
