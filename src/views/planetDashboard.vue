<template>
    <div id="app">
      <h1>Planetet</h1>
      <RouterLink to="/callsForm">
        <button class="addBtn">Shto <i class="fas fa-plus"></i></button>
      </RouterLink>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
          
          </tr>
        </thead>
        <tbody>
            <tr v-for="planet in planets" :key="planet.id">
            <td>{{ planet.name }}</td>
            <td>{{ planet.type }}</td>
          
            <td><button class="btn" @click="editPlanet(planet.name)"> <i class="fas fa-pen"></i> </button></td>
            <td><button class="btn" @click="fetchSatelites(planet.name)"> <i class="fas fa-pen"></i> </button></td>
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
        planets: [],
    
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        try {
          const response = await axios.get('http://localhost:5051/planets');
          this.planets = response.data;
          console.log(response.data);
        } catch (error) {
          console.error('Gabim gjatë marrjes së të dhënave:', error);
        }
      },
      editPlanet(name) {
        const nameP =name ;
        this.$router.push({ path: `planetU/${nameP}` });
      },
      async fetchSatelites(name) {
        try {
            const nameP = name;
          const response = await axios.get(`http://localhost:5051/api/planets/${nameP}/satelites`);
          this.planets = response.data;
          console.log(response.data);
        } catch (error) {
          console.error('Gabim gjatë marrjes së të dhënave:', error);
        }
      },
    },
   
  };
  </script>
  
  <style scoped>
  #app>h1 {
    margin-left: 10%;
  }
  .addBtn {
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
  .btn {
    width: 80%;
    margin-left: 10%;
    background-color: #fbfafa;
    cursor: pointer;
    border: solid 2px grey;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
  .search-bar {
    width: 40%;
    margin-left: 29%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }
  .search-bar input {
    padding: 8px;
    border-radius: 4px;
    border: 1.5px solid #ccc;
    flex: 1;
  }
  .search-bar button:hover {
    background-color: #58826e;
  }
  </style>
  