<template>
    <div class="unauthorized-container">
      <div class="unauthorized-content">
        <h1 class="unauthorized-title">Qasje e Paautorizuar</h1>
        <p class="unauthorized-text">Më vjen keq, ju nuk keni leje për të hyrë në këtë faqe.</p>
        <p class="unauthorized-text">Ju lutemi kontaktoni administratorin për ndihmë.</p>
        <img src="@/assets/UP.jpg" alt="Unauthorized Access" class="UPimage">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'unAuthPage',
  };
  </script>
  
  <style scoped>
  .unauthorized-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .unauthorized-content {
    text-align: center;
  }
  
  .unauthorized-title {
    font-size: 32px;
    color: #333;
  }
  
  .unauthorized-text {
    font-size: 18px;
    color: #666;
    margin-bottom: 10px;
  }
  
  .unauthorized-image {
    max-width: 100%;
    height: auto;
    margin-top: 20px;
  }
  </style>
  