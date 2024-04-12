<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" v-model="formData.email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" v-model="formData.password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      formData: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    submitForm() {
      axios.post('http://localhost:5051/login', this.formData)
        .then(() => {
          this.$router.push({ name: 'AdminDashboard' });
       
         
        })
        .catch(error => {
          console.error('Gabim në kycje', error);
         
        });
    }
  }
};
</script>

<style scoped>
/* Stilizimi mund të bëhet këtu */
</style>
