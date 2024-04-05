<template>
  <div class="super-dashboard">
    <h1>Admin Super Dashboard</h1>
    <div class="dashboard-boxes">
      <div class="dashboard-box">
        <h2>Activity Diagram</h2>
        <div class="diagram">
          <ActivityDiagram/>
        </div>
      </div>
      <div class="dashboard-box">
        <h2>Analysis Diagram</h2>
        <div class="diagram">
          <AnalysisDiagram/>
        </div>
      </div>
      <div class="dashboard-box">
        <h2>Payment Diagram</h2>
        <div class="diagram">
          <PaymentDiagram/>
        </div>
      </div>
      <div class="dashboard-box">
        <h2>Notifications Diagram</h2>
        <div class="diagram">
          <NotificationsDiagram/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActivityDiagram from './ActivityDiagram.vue';
import AnalysisDiagram from './AnalysisDiagram.vue';
import PaymentDiagram from './PaymentDiagram.vue';
import NotificationsDiagram from './NotificationsDiagram.vue';

export default {
  name: 'SuperDashboard',
  components: {
    ActivityDiagram,
    AnalysisDiagram,
    PaymentDiagram,
    NotificationsDiagram
  }
}
</script>

<style scoped>
.super-dashboard {
  font-family: Arial, sans-serif;
  margin: 20px;
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
  /* Styling for the diagram container */
}
</style>
