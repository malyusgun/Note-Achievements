<script setup lang="ts">
const emit = defineEmits(["openPageCreator", "openSettings"]);

const mainStore = useMainStore();

const menuItems = computed(() => mainStore.menuItems);
const mainTheme = computed(() => mainStore.mainTheme);
const contrastColor = computed(() => mainStore.contrastColor);
</script>

<template>
  <aside class="menu">
    <section class="menu__items">
      <AppMenuItem
        iconName="home"
        label="Домой"
        link="/"
        :theme="mainTheme"
        :contrastColor="contrastColor"
      />

      <template v-for="item of menuItems">
        <AppMenuItem
          :iconName="item.iconName"
          :label="item.label"
          :link="item.link"
          :theme="mainTheme"
          :contrastColor="contrastColor"
        />
      </template>

      <AppMenuItem
        iconName="plus"
        label="Добавить"
        @click="emit('openPageCreator')"
        class="menu__add-button"
        :theme="mainTheme"
        :contrastColor="contrastColor"
      />
    </section>

    <section class="menu__settings">
      <AppMenuItem
        iconName="settings"
        label="Настройки"
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
    width: 200px;

    :deep(.menu-item__label) {
      opacity: 1;
    }
  }

  &__items {
    > *:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  &__add-button {
    filter: brightness(150%);
  }

  &__settings {
    margin-top: 20px;
  }
}
</style>