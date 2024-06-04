<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>Rating</th>
          <th>Feedback</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="feedback in feedbacks" :key="feedback.id">
          <td>{{ getStars(feedback.rating) }}</td>
          <td>{{ feedback.comment }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      feedbacks: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:5051/api/Feedback/GetFeedbacks');
        this.feedbacks = response.data;
        console.log(this.feedbacks);
      } catch (error) {
        console.error('Gabim gjatë marrjes së të dhënave:', error);
      }
    },
    getStars(rating) {
      return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    }
  }
};
</script>

<style scoped>
.container {
  margin: 20px auto;
  width: 70%;
}

table {
  width: 80%;
  margin-left: 8%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

td {
  text-align: center;
  font-size: 1.2em;
}
</style>
