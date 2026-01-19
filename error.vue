<script setup lang="ts">
import { Button } from "@featherui";
</script>

<template>
  <section class="error">
    <img class="error__image" src="/okak.jpg" alt="">
    <h2 class="error__title">Бл*ть. Ошибка</h2>
    <p class="error__text">Попробуйте покумекать, почему</p>
    <p class="error__text --small">Если до Вас не дойдёт - кликните ниже</p>
    <NuxtLink to="/">
      <Button
        label="Вернуться домой. Дома всё же лучше, чем болтаться х*й пойми где"
        class="error__button"
      />
    </NuxtLink>
  </section>
</template>

<style scoped lang="scss">
.error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &__image {
    display: block;
    margin: 30px auto;
  }

  &__title {
    font-size: 32px;
    margin-bottom: 40px;
    text-align: center;
  }

  &__text {
    margin-bottom: 20px;
    text-align: center;

    &.--small {
      font-size: 14px;
    }
  }

  &__button {
    margin-top: 40px;
  }
}
</style>