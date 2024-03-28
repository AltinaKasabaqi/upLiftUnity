<template>
  <!-- <HomePage></HomePage> -->
  <AplicationForm></AplicationForm>
  <!-- <SuperDashboard></SuperDashboard> -->
  <SignUpForm></SignUpForm>
</template>

<script>
// import HomePage from './components/HomePage.vue'
import SignUpForm from './components/SignUpForm.vue'
// import AplicationForm from './components/VAplicationForm.vue'
export default {
  name: 'App',
  components: {
    // HomePage
    // SuperDashboard
    SignUpForm
    
  }
}
</script>

<style>
body{
  background-color: rgb(252, 251, 249);
  font-family: Georgia, 'Times New Roman', Times, serif;
  margin: 0%;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
