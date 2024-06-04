<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>Rating</th>
          <th>Feedback</th>
          <th >Veprime</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="feedback in feedbacks" :key="feedback.id">
          <td>{{ getStars(feedback.rating) }}</td>
          <td>{{ feedback.suggestion }}</td>
         <td> <button class="btn-delete" @click="deleteFeedback(feedback.feedbackId)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

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
        const response = await axios.get('http://localhost:5051/api/feedback/GetFeedback');
        this.feedbacks = response.data;
        console.log(this.feedbacks);
      } catch (error) {
        console.error('Gabim gjatë marrjes së të dhënave:', error);
      }
    },
    getStars(rating) {
      return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    },
    async deleteFeedback(id) {
      Swal.fire({
        title: "Fshije Rregullin",
        text: "A je i sigurt që dëshiron të fshish vleresimin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Po, fshije!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://localhost:5051/api/feedback/DeleteFeedback/${id}`);
            this.fetchData();
            Swal.fire("Success", "Rregulli u fshi me sukses!", "success");
          } catch (error) {
            console.error("Error deleting rule:", error);
            Swal.fire("Error", "Gabim gjatë fshirjes!", "error");
          }
        }
      });
    },
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
