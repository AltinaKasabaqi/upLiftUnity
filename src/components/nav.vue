<template>
  <nav class="navbar">
    <img src="../assets/logo-no-background.png" alt="Logo" class="logo" />
    <ul>
      <li><a href="default.asp">Rreth nesh</a></li>
      <li><a href="#">Na kontakto</a></li>
      <li><router-link to="/applicationForm">Bëhu vullnetarë</router-link></li>
      <li><router-link to="/donationPackages">Dhuro</router-link></li>
      <li><a href="default.asp">Rreth Nesh</a></li>
      <li><a href="#">Na Kontakto</a></li>
      <li><router-link to="/applicationForm">Bëhu Pjesë</router-link></li>
      <li><a href="#" @click="redirectToStripe">Dhuro</a></li> 
    </ul>
  </nav>
 
</template>

<script>



export default {
  name: "NavBar",
  }
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
}

.navbar {
  overflow: hidden;
  background-color: transparent;
  margin-top: 0;
  padding: 0;
}

.logo {
  float: left; 
  height: 11vh; 
  margin: 2%; 
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.navbar li {
  float: right;
}

.navbar li a {
  display: block;
  color: black;
  text-align: center;
  padding: 50px;
  text-decoration: none;
  font-size: 25px;
}

.navbar li a:hover {
  color: rgb(102, 102, 102);
}
</style>
