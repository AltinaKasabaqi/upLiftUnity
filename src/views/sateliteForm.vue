<template>
    <div class="login-container">
      <form @submit.prevent="submitForm" class="login-form">
        <h1 class="form-title">Shto Satelitin</h1>
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="name"
            id="name"
            v-model="formData.name"
            class="form-control"
            required
          />
        </div>
        <!-- <div class="form-group">
       <label for="panletType">Planet</label>
       <input
         type="number"
         id="panletType"
         v-model="formData.planetId"
         class="form-control"
         required
       />
     </div> -->
        <div class="form-group">
          <label for="planetId">Planeti:</label>
          <select id="planetId" v-model="formData.planetId" required class="form-control">
            <option v-for="planet in planets" :key="planet.id" :value="planet.id">
              {{ planet.name }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Dergo</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        formData: {
          name: "",
          planetId: ''
        },
        planets: []
      };
    },
    created() {
      this.getPlanets();
    },
    methods: {
      submitForm() {
        axios.post("http://localhost:5051/api/planets/satelites", this.formData)
          .then(response => {
            console.log('u shtua', response);
          })
          .catch(error => {
            console.error('Error during POST request:', error);
          });
      },
      getPlanets() {
        axios.get('http://localhost:5051/planets')
          .then(response => {
            this.planets = response.data;
            console.log(this.planets);
          })
          .catch(error => {
            console.error('Gabim gjatë marrjes së të dhënave:', error);
          });
      }
    },
  };
  </script>
  
  <style>
  .login-container {
    background-image: url("../assets/pema2.jfif");
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .login-form {
    background-color: rgb(252, 251, 249);
    padding: 20px;
    border-radius: 10px;
    width: 35%;
    text-align: center;
  }
  
  .form-title {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input {
    width: calc(100% - 1.5rem);
    padding: 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  
  .btn-primary {
    color: #fff;
    background-color: #b8ddbe;
    border: none;
    border-radius: 0.25rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  .btn-primary:hover {
    background-color: #52a086;
  }
  </style>
  