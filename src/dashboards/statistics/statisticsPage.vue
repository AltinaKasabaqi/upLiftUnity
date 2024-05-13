<template>
  <div class="super-dashboard">
    <h1>Statistikat e përgjithshme</h1>
    <div class="dashboard-boxes">
      <activity-chart />
      <analysis-chart />
      <payment-chart />
    </div>
  </div>
</template>

<script>
import ActivityChart from './graphs/activityChart.vue';
import AnalysisChart from './graphs/analysisChart.vue';
import PaymentChart from './graphs/monthlyDonations/monthlyDonation.vue';

export default {
  components: {
    ActivityChart,
    AnalysisChart,
    PaymentChart
  }
};
</script>

<style scoped>
.super-dashboard {
  font-family: Arial, sans-serif;
  margin-left: 7%;
  margin-right: 5%;
}

.super-dashboard h1 {
  text-align: center;
}

.dashboard-boxes {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.dashboard-box {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  width: calc(50% - 20px);
  box-sizing: border-box;
  transition: box-shadow 0.3s ease;
}

.dashboard-box:hover {
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.1);
}

.diagram {
  color: #ddd;
}
</style>
