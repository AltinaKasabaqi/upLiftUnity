<template>
    <div id="app">
      <h1>Aplikimet</h1>
      <div>
        <label for="filterType">Filtro aplikimet:</label>
        <select v-model="selectedType" id="filterType">
          <option value="">Të gjitha</option>
          <option value="supervisor">Supervisor</option>
          <option value="vullnetare">Vullnetare</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Emri & Mbiemri</th>
            <th>Email</th>
            <th>Nr_Tel</th>
            <th>CV</th>
            <th>Letra Motivuese</th>
            <th>Statusi</th>
            <th>Pozita</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="application in allApplications" :key="application.applicationId">
            <td>{{ application.nameSurname }}</td>
            <td>{{ application.email }}</td>
            <td>{{ application.phoneNumber }}</td>
            <td>{{ application.cv }}</td>
            <td>{{ application.motivationLetter }}</td>
            <td>{{ application.applicationStatus }}</td>
            <td>{{ application.applicationType }}</td>
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
        allApplications: [],
        selectedType: ''
      };
    },
    created() {
      this.fetchApplications();
    },
    watch: {
      selectedType() {
        this.fetchByType();
      }
    },
    methods: {
      fetchApplications() {
        axios.get('http://localhost:5051/api/applications/GetApplications')
          .then(response => {
            this.allApplications = response.data;
          })
          .catch(error => {
            console.error('Gabim gjatë marrjes së të dhënave:', error);
          });
      },
      fetchByType() {
        // Thirrni API-në për të marrë aplikacionet në bazë të llojit të zgjedhur
        if (this.selectedType === 'vullnetare' || this.selectedType === 'supervisor') {
          axios.get(`http://localhost:5051/api/applications/GetApplicationByType?type=${this.selectedType}`)
            .then(response => {
              this.allApplications = response.data;
            })
            .catch(error => {
              console.error('Gabim gjatë marrjes së të dhënave:', error);
            });
        } else {
          // Në rast se nuk është zgjedhur asnjë tip, thirrni API-në për të marrë të gjitha aplikacionet
          this.fetchApplications();
        }
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
  