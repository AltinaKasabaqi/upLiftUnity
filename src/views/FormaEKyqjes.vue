<template>
  <div class="login-page">
    <div class="background"></div>
    <NavBar></NavBar>
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
            <img src="@/assets/LP1.jpg" alt="Login Image">
          </div>
        </div>
      </div>
    </div>
    <PageFooter></PageFooter>
  </div>
</template>

<script>
import NavBar from '../components/nav.vue';
import PageFooter from '../components/footer.vue'

export default {
  components: {
    NavBar,
    PageFooter
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
.login-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  filter: brightness(0.5); /* Rregulloni ndriçimin e sfondit */
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  align-items: center;
}

.login-form {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease;
  width: 300px; /* Ndrysho madhësinë e formës */
  margin-right: 20px; /* Hapësirë midis formës dhe fotografisë */
}

.image {
  flex: 1;
}

.image-container {
  width: 350px; /* Madhësia e div-it që përmban imazhin */
  height: 350px; /* Lartësia e div-it që përmban imazhin */
  margin-left: auto; /* Vendosja e div-it të imazhit në të djathtë */
}

.image img {
  width: 100%; /* Përshtatja e imazhit brenda div-it */
  height: 100%; /* Përshtatja e imazhit brenda div-it */
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  color: #555;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
}

input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #9b4dca;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #9b4dca;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #7e3b8b;
}
</style>
