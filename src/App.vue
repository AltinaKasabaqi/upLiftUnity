<template>
  <!-- <HomePage></HomePage> -->
  <!-- <AplicationForm></AplicationForm> -->
  <!-- <SideBar></SideBar> -->
  <!-- <HomePage></HomePage> -->
  <!-- <AplicationForm></AplicationForm> -->
  <!-- <SuperDashboard></SuperDashboard> -->
  <!-- <SignUpForm></SignUpForm> -->
  <!-- <LoginForm></LoginForm> -->
  <DonationForm></DonationForm>
</template>

<script>
// import HomePage from './views/HomePage'
// import SignUpForm from './components/SignUpForm.vue'
// import AplicationForm from './components/VAplicationForm.vue'
// import SuperDashboard from './components/dashboards/superDashboard.vue'
import DonationForm from './views/donationForm.vue'
export default {
  name: 'App',
  components: {
    // HomePage
    DonationForm
    // SuperDashboard
    // SignUpForm
    // SuperDashboard
    // SignUpForm
    // LoginForm
    
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
