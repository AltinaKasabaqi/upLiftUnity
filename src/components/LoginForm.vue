<template>
    <div>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      login() {
        // Këtu mund të shtoni logjikën për të verifikuar emailin dhe fjalëkalimin
        // Në këtë rast, thjesht po printojmë të dhënat në console për testim
        console.log('Email:', this.email);
        console.log('Password:', this.password);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Stilizimi mund të bëhet këtu */
  </style>
  