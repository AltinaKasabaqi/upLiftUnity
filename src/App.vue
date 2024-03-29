<template>
  <HomePage></HomePage>
  <!-- <AplicationForm></AplicationForm> -->
  <SideBar></SideBar>
</template>

<script>
// import HomePage from './components/HomePage.vue'
import SideBar from './components/sideBar.vue'
export default {
  name: 'App',
  components: {
    // HomePage
    SideBar
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
