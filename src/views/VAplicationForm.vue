<template>
  <NavBar></NavBar>
  <div class="container">
    <div class="title">
      <h1>Bëhu pjesë e UpLiftUnity</h1>
    </div>
    <div class="content">
      <div class="image-container">
        <img src="../assets/gif.gif" alt="Image">
      </div>
      <div class="right">
        <div class="form-container">
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="nameSurname">Emri & Mbiemri:</label>
              <input type="text" id="nameSurname" v-model="formData.nameSurname" required>
            </div>
            <div class="form-group">
              <label for="email">Emaili:</label>
              <input type="email" id="email" v-model="formData.email" required>
            </div>
            <div class="form-group">
              <label for="phoneNumber">Numri i Telefonit:</label>
              <input type="tel" id="phoneNumber" v-model="formData.phoneNumber" required>
            </div>
            <div class="form-group">
              <label for="cv">CV:</label>
              <input type="text" id="cv" v-model="formData.cv" required>
            </div>
            <div class="form-group">
              <label for="description">Mesazhi:</label>
              <textarea id="description" rows="4" v-model="formData.description" required></textarea>
            </div>
            <div class="form-group">
              <label for="applicationType">Lloji i Aplikimit:</label>
              <select id="applicationType" v-model="formData.applicationType" required class="dropdown-menu">
                <option value="Supervisor">Mbikqyrës</option>
                <option value="Vullnetare">Vullnetare</option>
              </select>
            </div>
            <button type="submit">Apliko</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <PageFooter></PageFooter>
</template>


  
  <script>
  import NavBar from '../components/nav.vue';
  import PageFooter from '../components/footer.vue'
  import axios from 'axios';
  import Swal from 'sweetalert2';


  export default {
    components:{
        NavBar,
        PageFooter
    },
    data() {
      return {
        formData: {
          nameSurname: '',
          email: '',
          phoneNumber:'',
          cv:'',
          description: '',
          applicationType:''

        }
      };
    },
    methods: {
      async submitForm() {
        try{
          const response = await axios.post('http://localhost:5051/api/applications/AddApplication', this.formData);
          if(response && response.status === 200){
            console.log('u regjistrua');
            Swal.fire({
            icon: 'success',
            title: 'Suksese!',
            text: 'Aplikimi juaj u pranua me sukses.'
          });
          this.formData = {
          nameSurname: '',
          email: '',
          phoneNumber: '',
          cv: '',
          description: '',
          applicationType: ''
        };
          }
        }catch(error){
          console.log('Gabim në regjistrim:', error.response.data);
          if (error.response.status === 409) {
          this.errorMessage = 'Gabime gjatë regjistrimit: ' + error.response.data;
          
          } else {
            this.errorMessage = error.response.data;
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid 1px rgb(141, 141, 141);
    border-radius: 30px;
    margin: 10%;
    padding: 3%;
    box-shadow: 0px 0px 10px #436060;
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
    margin-left: -15%;
   
    
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
  input[type="tel"],
  select,
  textarea {
    width: 100%; 
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
  }
  input[type="file"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  background-color: #f9f9f9; 
}
select{
  width: 108%;
}
  button {
    padding: 10px 20px;
    background-color: #B8DDBE;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 108%;
   
  }
  
  button:hover {
    background-color: #52A086;
  }
  </style>
  
