<template>
  <div class="login-page">
    <div class="background"></div>
    <div class="container">
      <div class="content">
        <div class="login-form">
          <h2 class="title">Kyçu</h2>
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="email">E-Mail:</label>
              <input type="email" v-model="email" id="email" name="email" placeholder="Shkruani email-in tuaj" required>
            </div>
            <div class="form-group">
              <label for="password">Fjalëkalimi:</label>
              <input type="password" v-model="password" id="password" name="password" placeholder="Shkruani fjalëkalimin tuaj" required>
            </div>
            <button type="submit">Kyçu</button>
          </form>
        </div>
        <div class="image">
          <div class="image-container">
            <img src="@/assets/vpydh7mq.png" alt="Login Image">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  components: {
    
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      console.log("Email:", this.email);
      console.log("Fjalëkalimi:", this.password);
    }
  }
};
</script>

<style scoped> 
.login-page { position: relative; height: 100vh; } 

.background { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #f5f5f5; z-index: -1; } 
.container { display: flex; align-items: center; justify-content: center; } 
.content { display: flex; flex-wrap: wrap; justify-content: space-between; width: 80%; max-width: 600px; margin: 0 auto; } 
.login-form { flex: 1; margin-right: 30px; } 
.image { flex: 1; } .image-container { width: 100%; } 
.image img { width: 100%; height: auto; } 
.form-group { margin-bottom: 20px; } .form-group label { display: block; margin-bottom: 5px; } .form-group input[type="email"], .form-group input[type="password"] { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; } .form-group input[type="email"]:focus, .form-group input[type="password"]:focus { outline: none; box-shadow: 0 0 2px 1px #4CAF50; } .form-group button { width: 100%; padding: 10px; background-color: #4CAF50; color: #fff; border: none; border-radius: 5px; cursor: pointer; } .form-group button:hover { background-color: #3e8e41; } </style>
<!-- @keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
} -->


