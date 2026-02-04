<script setup lang="ts">
const emit = defineEmits(["openWorkspaceCreator", "openSettings"]);

const route = useRoute();
const mainStore = useMainStore();

const routePath = computed(() => route.path);
const workspaces = computed(() => mainStore.workspaces);
const mainTheme = computed(() => mainStore.mainTheme);
const contrastColor = computed(() => mainStore.contrastColor);
</script>

<template>
  <aside
    :class="[
      'menu',
      {
        '--home-workspace': route.path === '/',
      },
    ]"
  >
    <section class="menu__items">
      <AppMenuItem
        icon="home"
        name="Домой"
        link="/"
        :theme="mainTheme"
        :contrastColor="contrastColor"
        :currentPath="routePath"
      />

      <template v-for="workspace of workspaces" :key="workspace.workspaceId">
        <AppMenuItem
          :icon="workspace.icon"
          :name="workspace.name"
          :link="workspace.link"
          :theme="mainTheme"
          :contrastColor="contrastColor"
          :currentPath="routePath"
        />
      </template>
    </section>

    <section class="menu__footer">
      <AppMenuItem
        icon="plus"
        name="Добавить"
        @click="emit('openWorkspaceCreator')"
        :theme="mainTheme"
        :contrastColor="contrastColor"
        :currentPath="routePath"
      />
      <AppMenuItem
        icon="coins"
        name="Финансы"
        link="/finance"
        :theme="mainTheme"
        :contrastColor="contrastColor"
        :currentPath="routePath"
      />
      <AppMenuItem
        icon="settings"
        name="Настройки"
        @click="emit('openSettings')"
        :theme="mainTheme"
        :contrastColor="contrastColor"
        :currentPath="routePath"
        class="menu__settings-button"
      />
    </section>
  </aside>
</template>

<style scoped lang="scss">
.menu {
  width: 82px;
  height: 100vh;
  padding: 20px 10px;
  border-right: 2px solid v-bind(contrastColor);
  transition: width 0.2s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover,
  &.--home-workspace {
    width: 250px;

    :deep(.menu-item__label) {
      opacity: 1;
    }
  }

  &__items {
    overflow-y: auto;

    > * {
      margin-bottom: 20px;
    }
  }

  &__settings-button {
    filter: brightness(150%);
  }

  &__footer {
    > *:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}
</style>
