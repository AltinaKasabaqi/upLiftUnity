<template>
    <NavBar></NavBar>
    <!-- <div class="container">
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
    </div> -->
    <form action="http://localhost:5051/api/users" method="post">
        <label for="name">Emri:</label><br>
        <input type="text" id="name" name="name" required><br>

        <label for="surname">Mbiemri:</label><br>
        <input type="text" id="surname" name="surname" required><br>

        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br>

        <label for="RoleId">RoleId:</label><br>
        <input type="number" id="RoleId" name="RoleId" required><br>

        <label for="password">Fjalëkalimi:</label><br>
        <input type="password" id="password" name="password" required><br>

        <label for="phoneNumber">Numri:</label><br>
        <input type="text" id="phoneNumber" name="phoneNumber" required><br>

        <label for="address">Numri:</label><br>
        <input type="text" id="address" name="address" required><br>

        <input type="submit" value="Regjistrohu">
    </form>
    <PageFooter></PageFooter>
  </template>
  
  <script>
  import NavBar from '../components/nav.vue';
  import axios from 'axios';

  //import PageFooter from './footer.vue'
 
  export default {
    
    components:{
      NavBar
    },
    data() {
    return {
      formData: {
        name: '',
        surname: '',
        email: '',
        RoleId:'',
        password: '',
        phoneNumber:'',
        address:''
      }
    };
  },
  methods: {
    submitForm() {
      axios.post('http://localhost:5051/api/users', this.formData)
        .then(response => {
          console.log(response.data);
          console.log('u regjistru')
        })
        .catch(error => {
          console.error('Gabim në regjistrim:', error);
          // Optionally, handle error response
        });
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
  display: flex;
  justify-content: center; /* vendos formën në qendër */
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
  