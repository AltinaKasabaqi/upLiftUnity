<template>
    <footer class="footer">
      <div class="left">
        <img src="../assets/logo-no-background.png" alt="Logo" />
      </div>
      <div class="right">
        <p>Kontaktoni në: upLiftUnity@outlook.com</p>
        <p>Telefon: +311 222 345</p>
        <p>&copy; 2024 UpLiftUnity. Të gjitha të drejtat e rezervuara.</p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'PageFooter'
  }
  </script>
  
  <style scoped>
  .footer {
    height: 30vh;
    margin: 5% 0% 0% 0%;
    background-color: transparent;
    color: black;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(232, 232, 232);
  }
  
  .left img {
    height: 15vh;
    margin-left: 10%; 
  }
  
  .right p {
    margin: 2% 0; 
    text-align: right; 
  }
  </style>
  