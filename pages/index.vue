<script setup lang="ts">
import { Knob, Button } from "@featherui";
</script>

<template>
  <article class="home">
    <h1 class="home__title">Hello World!</h1>
    <Knob />
    <Button iconOnly theme="blue">
      <AppIcon name="home" />
    </Button>
  </article>
</template>

<style scoped lang="scss">
.home {
  height: 100vh;
  overflow-y: auto;
  padding: 20px 40px;
}
</style>
