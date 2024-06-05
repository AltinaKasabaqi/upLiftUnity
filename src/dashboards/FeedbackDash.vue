<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th>Vleresimi</th>
          <th>Mesazhi</th>
          <th >Veprime</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="feedback in feedbacks" :key="feedback.id">
          <td>{{ getStars(feedback.rating) }}</td>
          <td>{{ feedback.suggestion }}</td>
         <td> <button class="delete-btn" @click="deleteFeedback(feedback.feedbackId)">Fshije</button></td>
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
.delete-btn {
    padding: 8px 12px;
    margin-right: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .delete-btn {
    border:solid 1px #f44336;
    color: black;
    font-size: 14px;
    background-color: white;
  }
  
</style>
