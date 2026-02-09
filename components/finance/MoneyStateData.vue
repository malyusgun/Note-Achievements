<script setup lang="ts">
import { Button, ToggleSwitch } from "@featherui";
import { v4 as uuidv4 } from "uuid";
import type { IMoneyStateDataProps } from "~/types/props";
import DragAndDropArea from "~/components/DragAndDropArea.vue";
import type { IFinanceStateItem } from "~/types";

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
const items = computed(() => data.value.items);
const mainTheme = computed(() => userStore.mainTheme);

const addItem = () => {
  const newItem = {
    id: uuidv4(),
    income: null,
    expense: null,
    freeMoney: null,
    dateLabel: "",
  };
  financesStore.addFinancesStateItem(newItem);
};

const onUpdateItem = (newValue: string | number, field: string, id: string) => {
  financesStore.editFinancesStateHistory({ id, [field]: newValue });
};
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
      <h3 class="money-state-data__title">Свободные</h3>
    </div>
    <DragAndDropArea v-model="data.items" class="money-state-data__list">
      <template #item="{ item }">
        <FinanceMoneyStateDataItem
          :item="item as IFinanceStateItem"
          :mainTheme="mainTheme"
          @updateItem="onUpdateItem"
          @openDeleteModal="openDeleteModal"
          class="money-state-data__item"
        />
      </template>
    </DragAndDropArea>
    <!--    <ul class="money-state-data__list">-->
    <!--      <li class="money-state-data__item">-->
    <!--        <FinanceMoneyStateDataItem-->
    <!--          v-for="item in items"-->
    <!--          :key="item.id"-->
    <!--          :item="item"-->
    <!--          :mainTheme="mainTheme"-->
    <!--          @updateItem="onUpdateItem"-->
    <!--          @deleteItem="onDeleteItem"-->
    <!--        />-->
    <!--      </li>-->
    <!--    </ul>-->
    <div class="money-state-data__footer">
      <Button label="Добавить запись" @click="addItem" :theme="mainTheme">
        <AppIcon name="badge" :size="20" />
      </Button>
      <ToggleSwitch
        negativeTheme="grey"
        :theme="mainTheme"
        :modelValue="chartTwoAxlesComponent === 'bar'"
        @update:modelValue="$emit('onToggleComponent')"
      />
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
  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    width: 25%;
    text-align: center;
  }

  &__footer {
    margin: 30px 0;
    display: flex;
    gap: 50px;
  }
}
</style>
