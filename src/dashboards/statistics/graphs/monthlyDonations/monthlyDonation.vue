<template>
  <div class="dashboard-box">
    <h2>Monthly Donation Chart</h2>
    <div v-if="chartData.labels.length > 0">
      <component :is="chartType === 'pie' ? 'PieChart' : 'BarChart'"
                 :data="chartData"
                 :colorPalette="colorPalette" />
    </div>
    <button @click="toggleChartType" :class="chartType === 'pie' ? 'toggle-button pie' : 'toggle-button bar'">
      {{ chartType === "pie" ? "Switch to Bar Chart" : "Switch to Pie Chart" }}
    </button>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import PieChart from "./monthlyPieChart.vue";
import BarChart from "./monthlyBarChart.vue";

export default {
  components: {
    PieChart,
    BarChart
  },
  data() {
    return {
      chartType: "pie",
      chartData: { labels: [], data: [] },
      colorPalette: [
        "#9ea8f0", "#9ef0e6", "#f0e69e", "#d4aec9", "#d1dbff", "#ffded1",
        "#d4b9ae", "#aec9d4", "#d1dbff", "#aed4b9", "#aec1d4", "#e5b895"
      ],
    };
  },
  mounted() {
    this.fetchMonthlyDonations();
  },
  methods: {
    async fetchMonthlyDonations() {
      try {
        const token = Cookies.get("token");
        const response = await axios.get("http://localhost:5051/api/donations/GetMonthlyDonationCounts", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const monthlyDonationCounts = response.data;
        console.log("Monthly donations:", monthlyDonationCounts);

        if (Array.isArray(monthlyDonationCounts) && monthlyDonationCounts.length > 0) {
          const labels = monthlyDonationCounts.map((item) => item.month);
          const data = monthlyDonationCounts.map((item) => item.donations);
          this.chartData = { labels, data };
        } else {
          console.error("Monthly donation counts data is empty or invalid.");
        }
      } catch (error) {
        console.error("Error fetching monthly donation counts:", error);
      }
    },
    toggleChartType() {
      this.chartType = this.chartType === "pie" ? "bar" : "pie";
    },
  },
};
</script>

<style scoped>
.toggle-button {
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.toggle-button.pie {
  background-color: #6c9176;
}

.toggle-button.bar {
  background-color: #6c9176;
}

.toggle-button:hover {
  opacity: 0.8;
}
</style>
