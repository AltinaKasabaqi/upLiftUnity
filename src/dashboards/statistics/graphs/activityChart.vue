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
import axios from 'axios';

export default {
  data() {
    return {
      activityData: [] 
    };
  },
  mounted() {
    this.fetchActivityData(); 
  },
  methods: {
    async fetchActivityData() {
      try {
        const response = await axios.get('http://localhost:5051/api/Activities/GetMonthlyLoginCounts');
        this.activityData = response.data;
        console.log("Response data: ",response.data);
        this.renderChart();
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    },
    renderChart() {
      const ctx = this.$refs.activityChartCanvas.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.activityData.map(activity => activity.month), 
          datasets: [{
            label: 'Login Counts',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            data: this.activityData.map(activity => activity.loginCount) 
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
  }
};
</script>

<style scoped>
.diagram {
  color: #ddd;
}
</style>
