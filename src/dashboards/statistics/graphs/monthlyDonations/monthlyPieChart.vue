<template>
    <div class="chart-container">
      <canvas ref="donationsChartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from "chart.js/auto";
  
  export default {
    props: ['data', 'colorPalette'],
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        const ctx = this.$refs.donationsChartCanvas.getContext("2d");
  
        const chartData = {
          labels: this.data.labels,
          datasets: [
            {
              label: "Monthly Donations",
              data: this.data.data,
              backgroundColor: this.colorPalette.slice(0, this.data.labels.length),
              borderColor: "rgba(255, 255, 255, 1)",
              borderWidth: 1,
            },
          ],
        };
  
        new Chart(ctx, {
          type: 'pie',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .chart-container {
    position: relative;
    height: 300px; /* Adjust height as needed */
  }
  </style>
  