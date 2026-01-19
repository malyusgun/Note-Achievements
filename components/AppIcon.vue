<script setup lang="ts">
import icons from "~/assets/icons";

interface IProps {
  name: string;
  color?: string;
  size?: number;
}

const props = defineProps<IProps>();

const iconSize = computed(() => (props.size || 32) + "px");
const iconName = computed(() => icons[props.name]);
</script>

<template>
  <component :class="[`icon color-${color || 'black'}`]" :is="iconName" />
</template>

<style scoped lang="scss">
.icon {
  width: v-bind(iconSize);
  height: v-bind(iconSize);
}
</style>