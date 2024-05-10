<template>
    <div id="app">
      <h1>Aktivitetet e Përdoruesve</h1>
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Kërko ...">
      </div>
      <table>
        <thead>
          <tr>
            <th>Përdoruesi</th>
            <th>Email</th>
            <th>Roli</th>
            <th>IP Adresa</th>
            <th>Koha</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="userActivity in filteredActivities" :key="userActivity.Id">
            <td>{{ userActivity.user.name }}  {{ userActivity.user.surname }}</td>
            <td>{{ userActivity.user.email }}</td>
            <td>
                {{ userActivity.user.roleId == '2' ? 'Mbikqyrës' : (userActivity.user.roleId == '3' ? 'Vullnetarë' : 'Administratorë') }}
            </td>
            <td>{{ userActivity.ipAddress }}</td>
            <td>{{ formatDateTime(userActivity.loginTime) }}</td>
          </tr>
        </tbody>
      </table>
    </div>  
  </template>
  
  <script>
  import axios from '../api/axios';
  
  export default {
    data() {
      return {
        activities: [],
        searchQuery: ''
      };
    },
    created() {
      this.fetchApplications();
    },
    methods: {
      fetchApplications() {
        axios.get('http://localhost:5051/api/Activities/GetActivities')
          .then(response => {
            this.activities = response.data;
          })
          .catch(error => {
            console.error('Gabim gjatë marrjes së të dhënave:', error);
          });
      },
      formatDateTime(dateTimeString) {
        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleString(); 
      },
     
    },
    computed: {
      filteredActivities() {
        return this.activities.filter(activity =>
          activity.user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          activity.user.surname.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    }
  }
  </script>
  
  <style scoped>
 
  #app {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    
  }
  
  .search-bar {
    width:40%;
    margin-left: 29%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
  
  .search-bar input {
    padding: 8px;
    border-radius: 4px;
    border:  1.5px solid #ccc;
    flex: 1;
  }
  
  /* .search-bar button {
    padding: 10px 15px;
    margin-left: 10px;
    border-radius: 4px;
    border: none;
    background-color: #70a090;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
  } */
  
  .search-bar button:hover {
    background-color: #58826e;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
  }
  
  table th,
  table td {
    padding: 10px;
    border: 1px solid #919191;
  }
  
  table th {
    background-color: #dbdbdb;
    font-weight: bold;
    color: black;
  }
  h1{
    margin-left: 30%;
  }
  </style>
  