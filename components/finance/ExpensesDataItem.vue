<script setup lang="ts">
import type { TFinancesExpensesDataItem } from "~/types";

interface IProps {
  item: TFinancesExpensesDataItem;
}

const props = defineProps<IProps>();
const emits = defineEmits(["updateItem"]);

let timerId = 0;

const onChange = (newValue: string | number, field: string) => {
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    emits("updateItem", newValue, field, props.item.id);
  }, 500);
};
</script>

<template>
  <div class="expenses-data-item">
    <AppInputBordered
      :modelValue="item.food"
      type="number"
      @change="onChange($event, 'food')"
    />
    <AppInputBordered
      :modelValue="item.publicCatering"
      type="number"
      @change="onChange($event, 'publicCatering')"
    />
    <AppInputBordered
      :modelValue="item.housing"
      type="number"
      @change="onChange($event, 'housing')"
    />
    <AppInputBordered
      :modelValue="item.forHome"
      type="number"
      @change="onChange($event, 'forHome')"
    />
    <AppInputBordered
      :modelValue="item.health"
      type="number"
      @change="onChange($event, 'health')"
    />
    <AppInputBordered
      :modelValue="item.beauty"
      type="number"
      @change="onChange($event, 'beauty')"
    />
    <AppInputBordered
      :modelValue="item.transport"
      type="number"
      @change="onChange($event, 'transport')"
    />
    <AppInputBordered
      :modelValue="item.medicines"
      type="number"
      @change="onChange($event, 'medicines')"
    />
    <AppInputBordered
      :modelValue="item.education"
      type="number"
      @change="onChange($event, 'education')"
    />
    <AppInputBordered
      :modelValue="item.clothesAndFootwear"
      type="number"
      @change="onChange($event, 'clothesAndFootwear')"
    />
    <AppInputBordered
      :modelValue="item.entertainment"
      type="number"
      @change="onChange($event, 'entertainment')"
    />
    <AppInputBordered
      :modelValue="item.presents"
      type="number"
      @change="onChange($event, 'presents')"
    />
    <AppInputBordered
      :modelValue="item.other"
      type="number"
      @change="onChange($event, 'other')"
    />
  </div>
</template>

<style scoped lang="scss">
.expenses-data-item {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;

  :deep(.input__input) {
    min-width: 130px;
    border-radius: 0;
  }
}
</style>
