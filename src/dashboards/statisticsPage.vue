<template>
  <!-- <NotificationBar></NotificationBar>
  <SideBar></SideBar> -->
  <div class="super-dashboard">
    <h1>Statistikat e përgjithshme</h1>
    <div class="dashboard-boxes">
      <div class="dashboard-box">
        <h2>Diagrami i Aktivitetit</h2>
        <div class="diagram">
          <canvas id="activityChart"></canvas>
        </div>
      </div>
      <div class="dashboard-box">
        <h2>Diagrami i Analizave</h2>
        <div class="diagram">
          <canvas id="analysisChart"></canvas>
        </div>
      </div>
      <div class="dashboard-box">
        <h2>Diagrami i Pagesave</h2>
        <div class="diagram">
          <canvas id="paymentChart"></canvas>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
// import SideBar from '../components/sideBar.vue';
// import NotificationBar from '../components/notificationBar.vue';

export default {
  // components:{
  //   SideBar,
  //   NotificationBar,
  // },
  mounted() {
    // Activity Chart
    new Chart(document.getElementById('activityChart'), {
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
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Analysis Chart
    new Chart(document.getElementById('analysisChart'), {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: 'Analysis',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });

    // Payment Chart
    new Chart(document.getElementById('paymentChart'), {
      type: 'pie',
      data: {
        labels: ['Kartele Bankare', 'Kesh', 'Stripe'],
        datasets: [{
          label: 'Payment',
          data: [300, 50, 100],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }
}
</script>

<style scoped>
.super-dashboard {
  font-family: Arial, sans-serif;
  margin-left: 7%;
  margin-right:5%;
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
  color:#ddd
}
</style>
