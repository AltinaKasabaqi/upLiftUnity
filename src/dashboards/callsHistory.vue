<template>
    <div id="app">
      <h1>Historiku i thirrjeve</h1>
      <table>
        <thead>
          <tr>
            <th>Caller Nickname</th>
            <th>Description</th>
            <th>Risk Level</th>
            <th>Ndrysho</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>{{ item.callerNickname }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.riskLevel }}</td>
            <td><button class="btn"> <i class="fas fa-pen"></i> </button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from '../api/axios.js'; 
  
  export default {
    data() {
      return {
        items: [] 
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
          const response = await axios.get('http://localhost:5051/calls');
          this.items = response.data;
          console.log(response) 
        } catch (error) {
          console.error('Gabim gjatë marrjes së të dhënave:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
    #app>h1{
    margin-left:10%;
  }
  table {
    margin: auto;
    width: 80%;
    border-collapse: collapse;
  }
  
  table th,
  table td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  table th {
    background-color: #768781;
    color: white;
  }
  .btn{
    width: 80%;
    margin-left:10%;
    background-color: #fbfafa;
    cursor: pointer;
    border:solid 2px grey;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    

  }
  </style>
  