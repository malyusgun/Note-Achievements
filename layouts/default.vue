<script setup lang="ts">
const isLoader = ref(true);

onMounted(() => {
  isLoader.value = false;
});

const mainStore = useMainStore();

const workspaceCreatorModal = ref(false);
const settingsModal = ref(false);

const openWorkspaceCreator = () => {
  workspaceCreatorModal.value = true;
};
const openSettings = () => {
  settingsModal.value = true;
};
</script>

<template>
  <main class="main">
    <AppMenu
      @openWorkspaceCreator="openWorkspaceCreator"
      @openSettings="openSettings"
    />

    <Transition>
      <AppLoader v-if="isLoader" />
    </Transition>

    <div class="main__content">
      <NuxtPage />
    </div>

    <WorkspaceCreatorModal v-model="workspaceCreatorModal" />
    <SettingsModal v-model="settingsModal" />
  </main>
</template>

<style scoped lang="scss">
.main {
  display: flex;

  &__content {
    flex: 1;
  }
}
</style>

<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}

.dark {
  body,
  .modal,
  .modal .buttonClose {
    background-color: #18181b !important;
    color: #ebf4f1 !important;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
