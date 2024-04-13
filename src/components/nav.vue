<template>
  <nav class="navbar">
    <img src="../assets/logo-no-background.png" alt="Logo" class="logo"> <!-- Shto imazhin në anën e majtë -->
    <ul>
      <li><a href="default.asp">Rreth nesh</a></li>
      <li><a href="#" @click="hapModal()">Na kontakto</a></li>
     <li> <router-link to="/applicationForm">Bëhu vullnetarë</router-link></li>
      <li><a href="about.asp">Dhuro</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    hapModal() {
      this.$emit('hap-modal');
    }
  }
}

</script>

<style scoped>
/* Resetimi i margin-it dhe padding-ut për të eliminuar hapësirat e panevojshme */
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
  float: left; /* Shto imazhin në anën e majtë */
  height: 11vh; /* Përshtatja e lartësisë së imazhit */
  margin:2%; /* Margini i djathtë i imazhit */
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
  padding: 50px ;
  text-decoration: none;
  font-size: 25px;
  

}

.navbar li a:hover {
  color: rgb(102, 102, 102);
}
</style>
