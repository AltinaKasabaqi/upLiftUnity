<template>
    <div>
      
      <div class="container">
        <h2 class="title">Përditëso të dhënat</h2>
        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        <form @submit.prevent="updateUser" class="content">
          <div class="left">
            <div class="form-group">
              <label for="emri">Emri:</label>
              <input type="text" id="emri" v-model="formData.name">
            </div>
            <div class="form-group">
              <label for="mbiemri">Mbiemri:</label>
              <input type="text" id="mbiemri" v-model="formData.surname">
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" v-model="formData.email" >
            </div>
            <div class="form-group">
              <label for="phoneNumber">Numri i telefonit:</label>
              <input type="tel" id="phoneNumber" v-model="formData.phoneNumber">
            </div>
            <div class="form-group">
              <label for="address">Adresa:</label>
              <input type="text" id="address" v-model="formData.address">
            </div>
            <div class="form-group">
              <label for="roli">Roli:</label>
              <select id="roli" v-model="formData.RoleId" >
                <option value="">Zgjidh Rolin</option>
                <option value="2">Mbikqyrës</option>
                <option value="3">Vullnetarë</option>
              </select>
            </div>
            <button type="submit">Përditëso</button> 
          </div>
          <div class="right">
         
          </div>
        </form>
      </div>
      
    </div>
  </template>
  
  <script>
 
  import axios from 'axios';
  
  export default {
    components: {
     
    },
    data() {
      return {
        formData: {
          name: '',
          surname: '',
          email: '',
          RoleId: '',
          password: '',
          phoneNumber: '',
          address: ''
        },
        errorMessage:'',
        userId: ''
      };
    },
    created() {
  const userId = this.$route.params.id;
  this.fetchUser(userId);
  this.userId = userId; 
},
    methods: {
      fetchUser(userId) {
        axios.get(`http://localhost:5051/api/users/GetUserByID/${userId}`)
          .then(response => {
            this.formData = response.data;
          })
          .catch(error => {
            console.error('Gabim gjatë marrjes së të dhënave:', error);
          });
      },
      updateUser() {
  axios.put(`http://localhost:5051/api/users/UpdateUser`, this.formData)
    .then(response => {
      console.log('Të dhënat u përditësuan me sukses:', response.data);
      this.$router.push('/allUsersView');
    })
    .catch(error => {
      console.error('Gabim gjatë përditësimit të të dhënave:', error);
      this.errorMessage = 'Gabim gjatë përditësimit të të dhënave';
    });
}
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    padding: 3%;
    box-shadow: 0px 0px 10px rgba(45, 9, 36, 0.2);
    margin: auto;
  }
  .title {
    text-align: center;
    margin: 20px 0;
    font-size: 24px;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 10px;
  }
  .form-group {
    margin-bottom: 20px;
  }
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
  }
  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="tel"],
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #c3a6ff;
    border-radius: 5px;
    text-align: center;
    background: linear-gradient(to bottom, #ffffff, #f2f2f2);
  }
  button {
    width: calc(100% - 20px);
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
  .alert {
    padding: 15px;
    /* border: 1px solid #f44336;  */
    border-radius: 5px;
    color: white;
    background-color: #ff6666; 
  }
  
  .alert-danger {
    background-color: #ff6666;
  }
  </style>
  