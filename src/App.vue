<template>
  <HomePage></HomePage>
  <!-- <SuperDashboard></SuperDashboard> -->
</template>

<script>
import HomePage from './components/HomePage.vue'
// import SuperDashboard from './components/dashboards/superAdminD.vue'
export default {
  name: 'App',
  components: {
    HomePage
    // SuperDashboard
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
