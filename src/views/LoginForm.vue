<template>
    <div>
      <form action="http://localhost:5051/login" method="post">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required>
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
        email: '',
        password: '',
        loginSuccess: false
      };
    },
    methods: {
      submitForm() {
        axios.post('http://localhost:5051/login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          alert('Kyçja u krye me sukses');
          this.loginSuccess = true; // Caktoni vlerën e loginSuccess si true për të treguar kyçjen e suksesshme
        })
        .catch(error => {
          console.error('Gabim në kyçje', error);
          // Optionally, handle error response
        });
      }
    }
  };
  </script>
  
  
  
  <style scoped>
  /* Stilizimi mund të bëhet këtu */
  </style>
  