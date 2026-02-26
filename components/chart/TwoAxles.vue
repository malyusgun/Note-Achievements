<script setup lang="ts">
import { Line, Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import type { ITwoAxlesProps } from "~/types/props";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);
ChartJS.defaults.borderColor = "#888";
ChartJS.defaults.color = "#888";
const props = defineProps<ITwoAxlesProps>();
const charts = {
  line: Line,
  bar: Bar,
};
const chartOptions = {
  responsive: true,
  borderColor: (ctx) => ctx.dataset?.backgroundColor || "#888",
  borderWidth: 2,
};
</script>

<template>
  <div class="two-axles">
    <component
      :is="charts[component]"
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>

<style scoped lang="scss">
.two-axles {
  max-width: 60%;
  margin: auto;
  padding: 10px;
}
</style>
