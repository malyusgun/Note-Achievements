<script setup lang="ts">
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
  RadialLinearScale,
} from "chart.js";
import type { ICircularProps } from "~/types/props";
import { Radar, Doughnut, PolarArea } from "vue-chartjs";

ChartJS.register(Title, Tooltip, Legend, CategoryScale, RadialLinearScale);
ChartJS.defaults.borderColor = "#888";
ChartJS.defaults.color = "#888";
const props = defineProps<ICircularProps>();
const charts = {
  radar: Radar,
  doughnut: Doughnut,
  polarArea: PolarArea,
};
const chartOptions = {
  responsive: true,
  borderColor: (ctx) => ctx.dataset?.backgroundColor || "#888",
  borderWidth: 2,
};
</script>

<template>
  <div class="one-axis">
    <component
      :is="charts[component]"
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>

<style scoped lang="scss">
.one-axis {
  max-width: 60%;
  margin: auto;
  padding: 10px;
}
</style>
