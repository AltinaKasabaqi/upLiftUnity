<template>
    <div id="app">
      <h1 class="page-title">Përdoruesit</h1>
        <div class="filter-section">
          <label class="filter-label" for="filterType">Filtro Përdoruesit:</label>
          <select v-model="selectedType" id="filterType" class="filter-select">
            <option value="">Të gjithë</option>
            <option value="2">Mbikqyrës</option>
            <option value="3">Vullnetarë</option>
          </select>
        </div>
      <button @click="goToSignUp" class="add-btn">Shto +</button> <!-- Shtuar butonin "Shto +" -->
      <table>
        <thead>
          <tr>
            <!-- <th>Id</th> -->
            <th>Emri</th>
            <th>Mbiemri</th>
            <th>Email</th>
            <!-- <th>Password</th> -->
            <th>Nr_Tel</th>
            <th>Adresa</th>
            <th>Roli</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in allUsers" :key="user.id">
            <!-- <td>{{ user.id }}</td> -->
            <td>{{ user.name }}</td>
            <td>{{ user.surname }}</td>
            <td>{{ user.email }}</td>
          
            <td>{{ user.phoneNumber }}</td>
            <td>{{ user.address }}</td>
            <td>
                {{ user.roleId == '2' ? 'Mbikqyrës' : (user.roleId == '3' ? 'Vullnetarë' : 'Admin') }}
</td>

            <td>
              <button @click="editUser(user.id)" class="edit-btn">Edito</button>
              <button @click="deleteUser(user.id)" class="delete-btn">Fshije</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  

   <script>
   import axios from 'axios';
   
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
           // Në rast se nuk është zgjedhur asnjë tip, thirrni API-në për të marrë të gjitha aplikacionet
           this.fetchUsers();
         }
       },
        editUser(userId) {
        if (userId) {
          this.$router.push({ name: 'UpdateUser', params: { id: userId } });
        } else {
          console.error('ID e përdoruesit është e pavlefshme.');
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
      }
    }

     
   };
   </script>
  
  <style scoped>
  #app {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }
  .filter-section {
  /* margin-bottom: 20px; */
  text-align:left; /* Vendosja e tekstit në qendër */
}

.filter-label {
  font-size: 16px;
  margin-right: 10px;
  color: #333; /* Ngjyra e tekstit */
}

.filter-select {
  padding: 8px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  /* Shtoni stilizime të tjera sipas preferencave tuaja */
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
  
  .edit-btn,
  .delete-btn,
  .add-btn {
    padding: 8px 12px;
    margin-right: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .edit-btn {
    background-color: 	#87CEFA;
    color: white;
  }
  
  .delete-btn {
    background-color: #f44336;
    color: white;
  }
  
  .add-btn {
    background-color: #778899;
    color: white;
    
    
  }
  </style>
  