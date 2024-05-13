<template>
  <div>
    <div class="container">
      <h2 class="title">Regjistro Stafin</h2>
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>
      <form @submit.prevent="submitForm" class="content">
        <div class="left">
          <div class="form-group">
            <label for="emri">Emri:</label>
            <input type="text" id="emri" v-model="formData.name" required>
          </div>
          <div class="form-group">
            <label for="mbiemri">Mbiemri:</label>
            <input type="text" id="mbiemri" v-model="formData.surname" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="formData.email" required>
          </div>
          <div class="form-group">
            <label for="fjalekalimi">Fjalëkalimi:</label>
            <input type="password" id="fjalekalimi" v-model="formData.password" required>
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
            <select id="roli" v-model="formData.RoleId" required>
              <option value="">Zgjidh Rolin</option>
              <option value="2">Mbikqyrës</option>
              <option value="3">Vullnetarë</option>
            </select>
          </div>
          <button type="submit">Regjistrohu</button>
        </div>
        <div class="right">
       
        </div>
      </form>
    </div>
    
  </div>
</template>

<script>
import axios from '../api/axios';

export default {
  components: {},
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
      errorMessage: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:5051/api/users', this.formData
        );
        if (response && response.status === 200) {
          console.log('u regjistru');
          this.$router.push({ name: 'AdminDashboard' });
        }
      } catch (error) {
 
        console.error('Gabim në regjistrim:', error.response.data);
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
  width: 40%;
  margin: 10% auto;
}

.title {
  text-align: center;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"],
select {
  width: calc(100% - 22px); /* Bëni inputat të më vogël për të mbështetur butonin */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

select {
  width: 100%; /* Rregulloni gjatësinë e selektorit */
}

button {
  display: block;
  width: 100%;
  padding: 8px;
  background-color: #B8DDBE;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px; /* Shtoni pakëz hapësirë midis butonit dhe inputeve */
}

button:hover {
  background-color: #52A086;
}

.alert {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 5px;
}

.alert-danger {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}
</style>