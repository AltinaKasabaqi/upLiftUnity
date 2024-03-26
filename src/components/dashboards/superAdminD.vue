<template>
    <div class="wrapper">
      <div class="sidebar">
        <div class="profile-icon">
          <i class="fas fa-user"></i> <!-- Font Awesome icon for user profile -->
        </div>
        <h3>Profili</h3>
        <p><i class="fas fa-user-alt"></i> Emri</p>
        <p><i class="fas fa-user-circle"></i> Llogaria e Përdoruesit</p>
        <p><i class="fas fa-bell"></i> Lajmërime</p>
  
        <h3>Paneli i Administratorit</h3>
        <ul>
          <li><i class="fas fa-home"></i> <router-link to="/HomePage">Faqja Kryesore</router-link></li>
          <li><i class="fas fa-users"></i> <router-link to="/users">Përdoruesit</router-link></li>
          <li><i class="fas fa-money-bill"></i> <router-link to="/payments">Pagesat</router-link></li>
          <li><i class="fas fa-chart-line"></i> <router-link to="/analytics">Analiza</router-link></li>
          <!-- Add more sidebar links as needed -->
        </ul>
  
        <h3>Komente dhe Sygjerime</h3>
        <p><i class="fas fa-comment"></i> Komente</p>
        <p><i class="fas fa-lightbulb"></i> Sygjerime</p>
  
        <h3>Ndihmë dhe mbështetje</h3> 
        <p><i class="fas fa-book"></i> Manual përdorimi</p>
  
        <ul>
          <li><i class="fas fa-sign-out-alt"></i> Çkyqu</li> 
        </ul>    
      </div>
      <div class="content">
        <!-- Dashboard content goes here -->
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'AdminDashboard',
    components: {
    }
  }
  </script>
  
  <style scoped>
  .wrapper {
    display: flex;
    min-height: 100vh;
  }
  
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #333;
    color: #fff;
    padding: 20px;
    text-align: left;
  }
  
  .profile-icon {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .sidebar h3 {
    margin-bottom: 20px;
  }
  
  .sidebar ul {
    list-style-type: none;
    padding: 0;
  }
  
  .sidebar ul li {
    margin-bottom: 10px;
  }
  
  .sidebar ul li a {
    color: #fff;
    text-decoration: none;
  }
  
  .content {
    flex: 1;
    margin-left: 270px; /* Adjust margin to make space for the sidebar */
    margin-top: 20px;
  }
  
  </style>
  