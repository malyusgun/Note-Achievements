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

const props = defineProps<ITwoAxlesProps>();
const charts = {
  line: Line,
  bar: Bar,
};
const chartOptions = ref({
  responsive: true,
  gridLine: {
    color: "#f00",
  },
  minor: {
    fontColor: "#f00",
  },
  major: {
    fontColor: "#f00",
  },
  legend: {
    labels: {
      // This more specific font property overrides the global property
      fontColor: "#f00",
    },
  },
});
</script>

<template>
  <div style="width: 1000px; margin: 150px auto; padding: 10px">
    <component
      :is="charts[component]"
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>

<style scoped lang="scss"></style>
