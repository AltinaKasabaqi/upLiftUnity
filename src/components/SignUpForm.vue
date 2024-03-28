<template>
    <NavBar></NavBar>
    <div class="container">
      <div class="title">
        <h1>Regjistrohu</h1>
      </div>
      <div class="content">
        <div class="right">
          <div class="form-container">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="firstname">Emri:</label>
                <input type="text" id="firstname" v-model="formData.firstname" required>
              </div>
              <div class="form-group">
                <label for="lastname">Mbiemri:</label>
                <input type="text" id="lastname" v-model="formData.lastname" required>
              </div>
              <div class="form-group">
                <label for="email">Emaili:</label>
                <input type="email" id="email" v-model="formData.email" required>
              </div>
              <div class="form-group">
                <label for="password">Fjalëkalimi:</label>
                <input type="password" id="password" v-model="formData.password" required>
              </div>
              <div class="form-group">
                <label for="confirmPassword">Konfirmo Fjalëkalimin:</label>
                <input type="password" id="confirmPassword" v-model="formData.confirmPassword" required>
              </div>
              <button type="submit">Regjistrohu</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <PageFooter></PageFooter>
  </template>
  
  <script>
  //import NavBar from './nav.vue';
  //import PageFooter from './footer.vue'
 
  export default {
    components:{
    //PageFooter
    },
    data() {
      return {
        formData: {
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
      };
    },
    methods: {
      submitForm() {
        console.log('FormData:', this.formData);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Stili i vendeve për të ruajtur input-et dhe textarea */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid 1px rgb(141, 141, 141);
    border-radius: 30px;
    margin: 10%;
    padding: 3%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
  
  .title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .content {
    display: flex;
    flex-wrap: wrap;
  }
  
  .left {
    flex: 1;
  }
  
  .right {
    flex: 1;
  
  }
  
  .image-container {
    padding: 20px;
    width: 50%;
  }
  
  .image-container>img{
    width: 100%;
  }
  .form-container {
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%; /* Ndërro width-in sipas preferencave tuaja */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
  }
  
  button {
    padding: 10px 20px;
    background-color: #B8DDBE;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #52A086;
  }
  </style>
  