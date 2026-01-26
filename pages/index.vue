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

const pages = computed(() => mainStore.pages);
const mainTheme = computed(() => mainStore.mainTheme);
const contrastColor = computed(() => mainStore.contrastColor);
</script>

<template>
  <article class="home">
    <section v-for="page of pages" :key="page.pageId" class="page">
      <h2 class="page__name">{{ page.name }}</h2>

      <ul class="page__blocks">
        <li
          v-for="block of page.blocks"
          :key="block.blockId"
          class="page__block"
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

            <p class="page__block-label">{{ block.label }}</p>
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

.page {
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
