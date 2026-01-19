<script setup lang="ts">
const emit = defineEmits(["openPageCreator", "openSettings"]);

const mainStore = useMainStore();

const pages = computed(() => mainStore.pages);
const mainTheme = computed(() => mainStore.mainTheme);
const contrastColor = computed(() => mainStore.contrastColor);
</script>

<template>
  <aside class="menu">
    <section class="menu__items">
      <AppMenuItem
        icon="home"
        name="Домой"
        link="/"
        :theme="mainTheme"
        :contrastColor="contrastColor"
      />

      <template v-for="page of pages">
        <AppMenuItem
          :icon="page.icon"
          :name="page.name"
          :link="page.link"
          :theme="mainTheme"
          :contrastColor="contrastColor"
        />
      </template>

      <AppMenuItem
        icon="plus"
        name="Добавить"
        @click="emit('openPageCreator')"
        class="menu__add-button"
        :theme="mainTheme"
        :contrastColor="contrastColor"
      />
    </section>

    <section class="menu__settings">
      <AppMenuItem
        icon="settings"
        name="Настройки"
        @click="emit('openSettings')"
        :theme="mainTheme"
        :contrastColor="contrastColor"
      />
    </section>
  </aside>
</template>

<style scoped lang="scss">
.menu {
  width: 80px;
  height: 100vh;
  padding: 20px 10px;
  border-right: 2px solid v-bind(contrastColor);
  transition: width 0.2s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    width: 250px;

    :deep(.menu-item__label) {
      opacity: 1;
    }
  }

  &__items {
    > * {
      margin-bottom: 20px;
    }
  }

  &__add-button {
    filter: brightness(150%);
  }

  &__settings {
  }
}
</style>
