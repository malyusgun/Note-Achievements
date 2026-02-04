<script setup lang="ts">
import { Knob, Button } from "@featherui";

const mainStore = useMainStore();

const knobColorGaps = [
  {
    start: 0,
    end: 20,
    color: "red",
  },
  {
    start: 21,
    end: 40,
    color: "orange",
  },
  {
    start: 41,
    end: 60,
    color: "yellow",
  },
  {
    start: 61,
    end: 80,
    color: "green",
  },
  {
    start: 81,
    end: 100,
    color: "sky",
  },
];

const workspaces = computed(() => mainStore.workspaces);
const mainTheme = computed(() => mainStore.mainTheme);
const contrastColor = computed(() => mainStore.contrastColor);
</script>

<template>
  <article class="home">
    <section
      v-for="workspace of workspaces"
      :key="workspace.workspaceId"
      class="workspace"
    >
      <h2 class="workspace__name">{{ workspace.name }}</h2>

      <ul class="workspace__blocks">
        <li
          v-for="block of workspace.blocks"
          :key="block.blockId"
          class="workspace__block"
        >
          <div style="width: max-content">
            <Knob
              :modelValue="block.progress"
              :max="100"
              :colorGaps="knobColorGaps"
              :negativeTheme="contrastColor === 'white' ? 'white' : '#18181b'"
              :color="contrastColor === 'white' ? 'white' : '#18181b'"
              :background="contrastColor === 'white' ? '#18181b' : 'white'"
              size="giant"
              disabled
            />

            <p class="workspace__block-label">{{ block.label }}</p>
          </div>
        </li>
      </ul>
    </section>
  </article>
</template>

<style scoped lang="scss">
.home {
  height: 100vh;
  overflow-y: auto;
  padding: 20px 40px;
}

.workspace {
  padding-bottom: 40px;
  border-bottom: 1px solid var(--gray-500);

  &__name {
    font-size: 40px;
    margin: 40px 0;
  }

  &__blocks {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 40px;
  }

  &__block-label {
    width: max-content;
    margin: 0 auto;
    font-size: 20px;
  }
}
</style>
