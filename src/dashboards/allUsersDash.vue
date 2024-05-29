<template>
    <div id="app">
      <button @click="sendEmailToUsers" class="notify-btn">Njofto per hapjen e orarit</button>
      <h1 class="page-title">Përdoruesit</h1>
        <div class="filter-section">
          <label class="filter-label" for="filterType">Filtro Përdoruesit:</label>
          <select v-model="selectedType" id="filterType" class="filter-select">
            <option value="">Të gjithë</option>
            <option value="2">Mbikqyrës</option>
            <option value="3">Vullnetarë</option>
          </select>
        </div>
      <button @click="goToSignUp" class="add-btn">Shto +</button> 
      <table>
        <thead>
          <tr>
            <th>Emri & Mbiemri</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Nr_Tel</th>
            <th>Adresa</th>
            <th>Roli</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in allUsers" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.surname }}</td>
            <td>{{ user.email }}</td>
          
            <td>{{ user.phoneNumber }}</td>
            <td>{{ user.address }}</td>
            <td>
                {{ user.roleId == '2' ? 'Mbikqyrës' : (user.roleId == '3' ? 'Vullnetarë' : 'Admin') }}
            </td>
            <td>
              <button @click="deleteUser(user.id)" class="delete-btn">Fshije</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  

   <script>
   import axios from '../api/axios.js';
   import Swal from 'sweetalert2';
   
   export default {
     data() {
       return {
         allUsers: [],
         selectedType: ''
       };
     },
     created() {
       this.fetchUsers();
     },
     watch: {
       selectedType() {
         this.fetchByType();
       }
     },
     methods: {
       fetchUsers() {
         axios.get('http://localhost:5051/api/users/GetUsers')
           .then(response => {
             this.allUsers = response.data;
           })
           .catch(error => {
             console.error('Gabim gjatë marrjes së të dhënave:', error);
           });
       },
       fetchByType() {
         if (this.selectedType === '2' || this.selectedType === '3') {
           axios.get(`http://localhost:5051/api/users/GetUsersByRoleId?roleId=${this.selectedType}`)
             .then(response => {
               this.allUsers = response.data;
             })
             .catch(error => {
               console.error('Gabim gjatë marrjes së të dhënave:', error);
             });
         } else {
           this.fetchUsers();
         }
       },
       deleteUser(userId) {
      axios.delete(`http://localhost:5051/api/users/DeleteUser?id=${userId}`)
        .then(() => {
          console.log('Përdoruesi u fshi me sukses');
          this.fetchUsers();
        })
        .catch(error => {
          console.error('Gabim gjatë fshirjes së përdoruesit:', error);
        });
    },
      goToSignUp() {
        this.$router.push({ name: 'SignUpForm' });
      },
      sendEmailToUsers() {
      Swal.fire({
        title: 'Jeni të sigurt?',
        text: 'Dëshironi të dërgoni emaila për të gjithë vullnetarët?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Po, dërgo!',
        cancelButtonText: 'Anulo'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post('http://localhost:5051/api/email/sendEmailToUsers')
            .then(() => {
              console.log('Emailat u dërguan me sukses.');
              // Optionally, you can show a success message or perform any other actions after sending emails
            })
            .catch(error => {
              console.error('Gabim gjatë dërgimit të emaileve:', error);
              // Optionally, you can show an error message or perform any other actions in case of an error
            });
        }
      });
    }}

     
   };
   </script>
  
  <style scoped>
  #app {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }
  .filter-section {
  
  text-align:left; 
}

.filter-label {
  font-size: 16px;
  margin-right: 10px;
  color: #333; 
}

.filter-select {
  padding: 8px 20px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  width: 12%;
  
}
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  table th,
  table td {
    padding: 10px;
    border: 1px solid #ccc;
  }
  
  table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  
  
  .delete-btn,
  .add-btn {
    padding: 8px 12px;
    margin-right: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .delete-btn {
    border:solid 1px #f44336;
    color: black;
    font-size: 14px;
    background-color: white;
  }
  
  .add-btn {
    background-color: #9ab59a;
    color: white;
    
    
  }
  .notify-btn{
    cursor: pointer;
    background-color: #9ab59a;
    padding: 1%;
    border: none;
    border-radius: 10px;
    color: white;
  }
  </style>
  