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
            <th>Pozita</th>
            <th>Statusi</th>
            <th>Shqyrtuar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="application in allApplications" :key="application.applicationId">
            <td>{{ application.nameSurname }}</td>
            <td>{{ application.email }}</td>
            <td>{{ application.phoneNumber }}</td>
            <td>{{ application.cv }}</td>
            <td>{{ application.applicationType }}</td>
            <td>{{ application.applicationStatus }}</td>
            <td><button @click="showUpdateAlert(application.applicationId)" class="btn"><i class="fas fa-check"></i></button></td>
            
          </tr>
        

      
        </tbody>
      </table>
    </div>  
  </template>
  
  <script>
import axios from '../api/axios';
import Swal from 'sweetalert2'; 

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
    updateStatus(id) {
      axios.put(`http://localhost:5051/api/applications/UpdateApplication/${id}`)
        .then(response => {
          console.log(response.data);
          this.fetchApplications();
        })
        .catch(error => {
          console.error('Gabim gjatë kërkesës PUT:', error);
        });
    },
    showUpdateAlert(id) {
      Swal.fire({ 
        title: 'Konfirmo',
        icon: 'question',
        iconColor: 'gray',
        titleAttributes: {
          fontFamily: 'Open Sans, sans-serif',
        },
        showCancelButton: true,
        confirmButtonColor: '#70a090',
        cancelButtonColor: 'rgba(255, 99, 132, 1)',
        confirmButtonText: 'Ndrysho!',
        cancelButtonText: 'Anulo',
        
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateStatus(id);
        }
      });
    },
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
      if (this.selectedType === 'vullnetare' || this.selectedType === 'supervisor') {
        axios.get(`http://localhost:5051/api/applications/GetApplicationByType?type=${this.selectedType}`)
          .then(response => {
            this.allApplications = response.data;
          })
          .catch(error => {
            console.error('Gabim gjatë marrjes së të dhënave:', error);
          });
      } else {
        this.fetchApplications();
      }
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
    background-color: #70a090;
    font-weight: bold;
    color: white;
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
  .btn{
    padding: 8px 12px;
    margin-right: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    background-color: rgba(75, 192, 192, 0.2);
    border: solid 1px #70a090;
    box-shadow:5px 5px 10px rgba(71, 71, 71, 0.2);

  }
  </style>
  