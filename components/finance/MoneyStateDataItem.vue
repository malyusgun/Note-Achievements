<script setup lang="ts">
import { Button } from "@featherui";
import type { IMoneyStateDataItemProps } from "~/types/props";

const props = defineProps<IMoneyStateDataItemProps>();
const emit = defineEmits(["updateItem", "openDeleteModal"]);

let timerId: number;

const onChange = (newValue: string | number, field: string) => {
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    emit("updateItem", newValue, field, props.item.id);
  }, 300);
};
</script>

<template>
  <div class="money-state-data-item">
    <div class="money-state-data-item__input">
      <AppInputBordered
        :modelValue="item.dateLabel"
        placeholder="Дата"
        @change="onChange($event, 'dateLabel')"
      />
    </div>
    <div class="money-state-data-item__input">
      <AppInputBordered
        :modelValue="item.income"
        placeholder="Доходы"
        type="number"
        class="number"
        @change="onChange($event, 'income')"
      />
    </div>
    <div class="money-state-data-item__input">
      <AppInputBordered
        :modelValue="item.expense"
        placeholder="Расходы"
        type="number"
        class="number"
        @change="onChange($event, 'expense')"
      />
    </div>
    <div class="money-state-data-item__input --free-money">
      <div
        v-if="dynamic"
        :class="[
          'money-state-data-item__dynamic',
          {
            '--growth': dynamic > 0,
            '--drop': dynamic < 0,
          },
        ]"
      >
        {{ dynamic }}
      </div>
      <AppInputBordered
        :modelValue="item.freeMoney"
        placeholder="Свободные деньги"
        type="number"
        class="number"
        @change="onChange($event, 'freeMoney')"
      />
    </div>
    <Button
      iconOnly
      :theme="mainTheme"
      size="small"
      class="money-state-data-item__delete"
      @click="$emit('openDeleteModal', item)"
    >
      <AppIcon name="basket" :size="16" />
    </Button>
  </div>
</template>

<style scoped lang="scss">
.money-state-data-item {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  position: relative;

  &:hover {
    .money-state-data-item__delete {
      opacity: 1;
    }
  }

  &__input {
    width: 25% !important;

    > * {
      margin: 0 auto;
    }

    .number {
      :deep(.input__input) {
        min-width: 120px;
      }
    }

    &.--free-money {
      position: relative;
    }
  }

  &__dynamic {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -20px;
    font-size: 0.75rem;

    &.--growth {
      color: $color-green;

      &::before {
        content: "🡅 ";
      }
    }

    &.--drop {
      color: $color-red;

      &::before {
        content: "🡇 ";
      }
    }
  }

  &__delete {
    opacity: 0;
    transition: opacity 0.3s;
    position: absolute;
    right: 20px;
  }
}
</style>
