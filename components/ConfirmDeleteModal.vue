<script setup lang="ts">
import { Button, Modal } from "@featherui";
import type { IConfirmDeleteModalProps } from "~/types";

const visible = defineModel();
defineProps<IConfirmDeleteModalProps>();
defineEmits(["confirm"]);
</script>

<template>
  <Modal v-model:visible="visible" :width="200" paddingRightOnActive="0">
    <template #header>Вы уверены?</template>

    <p class="delete-modal__paragraph">
      {{ description }}
    </p>

    <section class="delete-modal__buttons">
      <Button theme="red" label="Удалить" @click="$emit('confirm')">
        <AppIcon name="basket" :size="16" />
      </Button>

      <Button
        theme="green"
        label="Галя, у нас отмена"
        @click="visible = false"
      />
    </section>
  </Modal>
</template>

<style scoped lang="scss">
.delete-modal {
  &__paragraph {
    margin-bottom: 20px;
  }

  &__buttons {
    display: flex;
    gap: 20px;
  }
}
</style>
