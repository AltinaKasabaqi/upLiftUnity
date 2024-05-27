<template>
  <nav class="navbar">
    <a href="/"><img src="../assets/logo-no-background.png" alt="Logo" class="logo" /></a>
    <ul>
      <li><router-link to="/AboutUs">Rreth nesh</router-link></li>
      <li><router-link to="/contactUs">Na Kontakto</router-link></li>
      <li><router-link to="/applicationForm">Bëhu pjesë</router-link></li>
      <li><router-link to="/donationPackages">Dhuro</router-link></li>
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
