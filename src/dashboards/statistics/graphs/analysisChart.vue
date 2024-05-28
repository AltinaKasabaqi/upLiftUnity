<template>
  <div class="dashboard-box">
    <h2>Aktiviteti i Përdoruesve</h2>
    <div class="diagram">
      <canvas ref="analysisChartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
  mounted() {
    this.fetchUserLoginCounts(); 
  },
  methods: {
    async fetchUserLoginCounts() {
      try {
        const response = await axios.get('http://localhost:5051/api/Activities/GetUserLoginCounts');
        const userData = response.data;
        this.renderChart(userData);
      } catch (error) {
        console.error('Error fetching user login counts:', error);
      }
    },
    renderChart(userData) {
      const ctx = this.$refs.analysisChartCanvas.getContext('2d');
      const colors = this.generateColors(userData.length); 
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: userData.map(user => 'User ' + user.userId), 
          datasets: [{
            label: 'Login Counts',
            data: userData.map(user => user.loginCount),
            backgroundColor: colors,
            borderColor: colors.map(color => this.fadeColor(color, 0.5)), 
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          scales: {
            x: { beginAtZero: true }
          }
        }
      });
    },
    generateColors(count) {
      return Array.from({ length: count }, () =>
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`
      );
    },
    fadeColor(color, opacity) {
      const [r, g, b] = color.match(/\d+/g);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
  }
};
</script>

<style scoped>
.diagram {
  color: #ddd;
}
</style>
