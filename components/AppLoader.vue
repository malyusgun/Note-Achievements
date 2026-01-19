<script setup lang="ts"></script>

<template>
  <section class="loader">
    <div class="loader__content">
      <AppIcon name="loader" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.loader {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: white;

  &__content {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: rotate 2s linear infinite;

    @keyframes rotate {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    > * {
      min-width: 100%;
      min-height: 100%;
      color: $color-blue;
    }
  }
}
</style>
