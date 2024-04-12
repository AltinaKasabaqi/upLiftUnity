<template>
    <div id="app">
      <h1>Vullnetarët</h1>
      <button @click="goToSignUp" class="add-btn">Shto +</button> <!-- Shtuar butonin "Shto +" -->
      <table>
        <thead>
          <tr>
            <!-- <th>Id</th> -->
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <!-- <th>Password</th> -->
            <th>Phone Number</th>
            <th>Address</th>
         
            <!-- <th>Role Id</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <!-- <td>{{ user.id }}</td> -->
            <td>{{ user.name }}</td>
            <td>{{ user.surname }}</td>
            <td>{{ user.email }}</td>
          
            <td>{{ user.phoneNumber }}</td>
            <td>{{ user.address }}</td>
           
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
        users: []
      };
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      fetchUsers() {
        axios.get('http://localhost:5051/api/users/GetUsersByRoleId?roleId=3')
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            console.error('Gabim gjatë marrjes së të dhënave:', error);
          });
      },
     
 
},
      
    
 
      

  };
  </script>
  
  <style scoped>
  #app {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
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
  