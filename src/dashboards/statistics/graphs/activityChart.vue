<template>
    <div class="dashboard-box">
      <h2>Diagrami i Aktivitetit</h2>
      <div class="diagram">
        <canvas ref="activityChartCanvas"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  
  export default {
    mounted() {
      const ctx = this.$refs.activityChartCanvas.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Activity',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            data: [65, 59, 80, 81, 56, 55, 40]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  };
  </script>
  
  <style scoped>
  .diagram {
    color: #ddd;
  }
  </style>
  