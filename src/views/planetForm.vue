<template>
    <div class="login-container">
      <form @submit.prevent="submitForm" class="login-form">
        <h1 class="form-title">Shto Planetin</h1>
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
        <div class="form-group">
          <label for="panletType">Type</label>
          <input
            type="text"
            id="panletType"
            v-model="formData.type"
            class="form-control"
            required
          />
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
          type: ""
        },
      };
    },
    methods: {
      submitForm() {
        axios
          .post("http://localhost:5051/api/planets", this.formData)
            console.log('u shtua');
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
  