<script setup lang="ts">
const chartData = ref({
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Data",
      backgroundColor: "#f87979",
      data: [40, 20, 12, 13, 10, 65, 34],
    },
    {
      label: "Data 2",
      backgroundColor: "green",
      data: [20, 10, 6, 17, 14, 61, 22],
    },
  ],
});
const chartTwoAxlesComponent = ref<"line" | "bar">("bar");
</script>

<template>
  <ChartTwoAxles :component="chartTwoAxlesComponent" :chartData="chartData" />
</template>

<style scoped lang="scss"></style>
