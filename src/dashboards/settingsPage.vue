<template>
  <div class="settings-page">
    <section>
      <h2>Ndrysho fjalëkalimin</h2>
      <form @submit.prevent="changePassword">
        <div class="form-group1">
          <label for="currentPassword">Fjalëkalimi aktual:</label>
          <div class="password-input">
            <input
                id="currentPassword"
                v-model="passwordData.currentPassword"
                :type="showPassword1 ? 'text' : 'password'"
                required
              />
            </div>
         
        </div>
        <div class="form-group1">
          <label for="newPassword">Fjalëkalimi i ri :</label>
          <div class="password-input">
            <input
                id="newPassword"
                v-model="passwordData.newPassword"
                type="password"
                required
              /> 
            </div>
         

        </div>
        <div class="form-group1">
          <label for="confirmPassword"><b>Konfirmo :</b></label>
          <div class="password-input">
            <input
                id="confirmPassword"
                v-model="passwordData.confirmPassword"
                type="password"
                required
              />   
            </div>
         
        </div>
        <button type="submit">Ndrysho</button>
      </form>
    </section>
  </div>
</template>

<script>
import { getUserIdFromToken } from '@/authorization/authUserId';
import axios from '../api/axios.js';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      passwordData: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        userId: '',
        
      },
    };
  },
  methods: {
    async changePassword() {
      if(this.passwordData.newPassword !== this.passwordData.confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Gabim',
            text: 'Fjalëkalimet duhet të përputhen!',
            confirmButtonText: 'OK'
          });
          return;
      }
      this.userId = getUserIdFromToken();
      try {
        const response = await axios.post('http://localhost:5051/api/users/changePassword', {
          userId: this.userId,
          oldPassword: this.passwordData.currentPassword,
          newPassword: this.passwordData.confirmPassword
        });

        if (response.data === true) {
          Swal.fire({
            icon: 'success',
            title: 'Fjalëkalimi u ndryshua me sukses!',
            showConfirmButton: false,
            timer: 1500
          });
          this.currentPassword='';
          this.newPassword='';
          this.confirmPassword=''
        }else if(response.data === false){
          Swal.fire({
            icon: 'error',
            title: 'Gabim',
            text: 'Fjalëkalimi aktual është gabim !',
            confirmButtonText: 'OK'
          });

        }
      } catch (error) {
       
        console.error('Gabim gjatë editimit ', error);
        Swal.fire({
          icon: 'error',
          title: 'Gabim',
          text: 'Gabim gjatë ndryshimit të fjalëkalimit! Ju lutemi provoni përsëri.',
          confirmButtonText: 'OK'
        });
      }
      },
     
    }
  }


</script>

<style scoped>
.settings-page {
  width: 25%;
  margin: 10% auto;
}

h2 {
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
  background-color: #b8ddbe;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #52a086;
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

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
}

.password-toggle:hover {
  color: #333;
}




</style>

