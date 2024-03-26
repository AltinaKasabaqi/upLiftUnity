<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <HomePage></HomePage>
  <!-- <AplicationForm></AplicationForm> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import NavBar from './components/nav.vue'
// import BannerT from './components/banner.vue'
// import PageFooter from './components/footer.vue'
import HomePage from './components/HomePage.vue'
// import AplicationForm from './components/VAplicationForm.vue'
export default {
  name: 'App',
  components: {
    HomePage
  }
}
</script>

<style>
body{
  background-color: rgb(252, 251, 249);
  /* font-family:apple-system, BlinkMacSystemFont, segoe ui, Roboto; */
  font-family: Georgia, 'Times New Roman', Times, serif;
  margin: 0%;
}
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* padding: 0%;
  margin: 0%; */
 
}
</style>
