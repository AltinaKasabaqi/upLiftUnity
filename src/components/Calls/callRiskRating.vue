<template>
    <div class="container">
      <div class="form-wrapper">
        <h1>Rate the Call Risk</h1>
        <risk-stars v-model="selectedRating" :maxStars="5" @input="handleRatingChange" />
        <button @click="submitForm">Submit</button>
      </div>
    </div>
  </template>
  
  <script>
  import RiskStars from '../RiskStars.vue';
  
  export default {
    components: {
      RiskStars
    },
    data() {
      return {
        selectedRating: 0
      };
    },
    methods: {
      handleRatingChange(rating) {
        this.selectedRating = rating;
        console.log('Selected Rating:', rating);
      },
      submitForm() {
        console.log('Submitting Rating:', this.selectedRating);
        this.selectedRating = 0; 
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; 
    background-color: #f8f9fa; 
  }
  
  .form-wrapper {
    width: 400px;
    padding: 20px;
    border: 1px solid #ced4da;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
  }
  
  button {
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #62a3e4;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #14497e;
  }
  
  button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  </style>
  