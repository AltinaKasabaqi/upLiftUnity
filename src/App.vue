<template>
  <HomePage></HomePage>
  <!-- <AplicationForm></AplicationForm> -->
  <SideBar></SideBar>
  <!-- <HomePage></HomePage> -->
  <AplicationForm></AplicationForm>
  <!-- <SuperDashboard></SuperDashboard> -->
  <SignUpForm></SignUpForm>
  <LoginForm></LoginForm>
</template>

<script>
// import HomePage from './components/HomePage.vue'
// import SideBar from './components/sideBar.vue'
// import SignUpForm from './components/SignUpForm.vue'
// import AplicationForm from './components/VAplicationForm.vue'
import LoginForm from './components/LoginForm.vue'
export default {
  name: 'App',
  components: {
    // HomePage
    // SideBar
    // SuperDashboard
    // SignUpForm
    LoginForm
    
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
