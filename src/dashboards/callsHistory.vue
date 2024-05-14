<template>
    <div id="app">
      <h1>Historiku i thirrjeve</h1>
      <RouterLink to="/callsForm"><button class="addBtn">Shto <i class="fas fa-plus"></i></button></RouterLink>
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
            <td><button class="btn" @click="editCall(item.callId)"> <i class="fas fa-pen"></i> </button></td>
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
      },
      editCall(callId) {
            const Id = callId
            this.$router.push({ path: `updateCall/${Id}` }); 
            console.log(callId);
        
          
        },
    }
  };
  </script>
  
  <style scoped>
    #app>h1{
    margin-left:10%;
  }
  .addBtn{
   border-radius: 5px;
    margin: 1% 10%;
    padding: 5px;
    width: auto;
    background-color: #9ab59a;
    border: solid 1px rgb(148, 147, 147);
    cursor: pointer;
    font-size: 16px;
    color: white;

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
    background-color: #f2f2f2;
    font-weight: bold;
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
  