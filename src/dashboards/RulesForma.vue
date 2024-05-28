<template>
  <div>
    <div class="container">
      <h2 class="title">Rregullat e Linjes Telefonike</h2>
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>
      <form @submit.prevent="submitForm" class="content">
        <div class="left">
          <div class="form-group">
            <label for="emri">Rregulla</label>
            <input type="text" id="name" v-model="formData.name" required>
          </div>
          <div class="form-group">
            <label for="mbiemri">Pershkrimi:</label>
            <input type="text" id="description" v-model="formData.description" required>
          </div>
          <button type="submit">Shto</button>
        </div>
        <div class="right">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '../api/axios';
import Swal from 'sweetalert2';

export default {
  components: {},
  data() {
    return {
      formData: {
        name: '',
        description: ''
      },
      errorMessage: ''
    };
  },
  methods: {
    async submitForm() {
      if (!this.formData.name || !this.formData.description) {
        await Swal.fire({
          icon: 'error',
          title: 'Gabim',
          text: 'Ju lutem plotësoni të gjitha fushat.'
        });
        return;
      }
      try {
        const response = await axios.post('http://localhost:5051/api/rules/AddRule', this.formData);
        if (response && response.status === 200) {
          await Swal.fire({
            icon: 'success',
            title: 'Sukses',
            text: 'Rregullat u shtuan me sukses!'
          });
          this.$router.push({ name: 'AdminDashboard' });
        }
      } catch (error) {
        console.error('Gabim në shtimin e rregullave:', error.response.data);
        if (error.response.status === 409) {
          this.errorMessage = 'Gabime gjatë shtimit te rregullave: ' + error.response.data;
        } else {
          this.errorMessage = error.response.data;
        }
        await Swal.fire({
          icon: 'error',
          title: 'Gabim',
          text: this.errorMessage || 'Gabim gjatë shtimit te rregullave!'
        });
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
  width: calc(100% - 22px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

select {
  width: 100%;
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
  margin-top: 10px;
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
