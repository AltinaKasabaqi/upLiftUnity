<template>
  <div class="login-container">
    <form @submit.prevent="submitForm" class="login-form">
      <h1 class="form-title">Kyçu</h1>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="password">Fjalëkalimi:</label>
        <input type="password" id="password" v-model="formData.password" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Kyçu</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

import Cookies from 'js-cookie';


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
    .then(response => {
      // Marrja e tokenit nga përgjigja
      const token = response.data.token;

      
      Cookies.set('token', token, {expires:1}); 
      console.log("Tokeni i vendosur në cookie:", token); 

      // Përcaktoni navigimin drejt AdminDashboard duke përdorur router
      this.$router.push({ name: 'AdminDashboard' });
    })
    .catch(error => {
      console.error('Gabim në kyçje', error);
    });
}
  }
};
</script>


<style>
.login-container {
  background-image: url("../assets/pema2.jfif");
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}



.login-form {
  background-color: rgb(252, 251, 249);
  padding: 20px;
  border-radius: 10px;
  width: 35%;
  text-align: center; /* Qendro tekstin e formës */
}

.form-title {
  margin-bottom: 20px; /* Përcakto një hapësirë midis titullit dhe fushave */
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: calc(100% - 1.5rem); 
  padding: 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-primary {
  color: #fff;
  background-color: #B8DDBE;
  border: none;
  border-radius: 0.25rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #52A086;
}
</style>
