<template>
    <div>
      <h1>Zgjedhni paketën tuaj të donacionit!</h1>
      <div class="package-card" v-for="donationPackage in packages" :key="donationPackage.id" @click="redirectToStripe(donationPackage)">
        <img :src="getImageUrl(donationPackage.id)" alt="Package Image">
        <div class="package-details">
          <h3>{{ donationPackage.name }}</h3>
          <p>${{ donationPackage.price }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        packages: [
          { id: 1, name: 'Package 1', price: 100 },
          { id: 2, name: 'Package 2', price: 200 },
          { id: 3, name: 'Package 3', price: 300 }
        ],
        imageUrls: {
          1: "../assets/donation1.gif",
          2: "../assets/donation2.gif",
          3: "../assets/donation3.gif"
        }
      };
    },
    methods: {
    async redirectToStripe(selectedPackage) {
      try {
        const response = await axios.post('http://localhost:5051/api/donations/CreateCheckoutSession/' + selectedPackage.id);
        const { url } = response.data;
        window.location = url;
      } catch (error) {
        console.error(error);
      }
    },
      getImageUrl(packageId) {
        return this.imageUrls[packageId] || '';
      }
    }
  };
  </script>
  
  <style scoped>
  .package-card {
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    width: 200px;
    cursor: pointer;
  }
  
  .package-card img {
    width: 100%;
    height: auto;
    border-radius: 5px 5px 0 0;
  }
  
  .package-details {
    padding: 10px;
  }
  
  .package-details h3 {
    margin-top: 0;
  }
  
  .package-details p {
    margin: 5px 0;
  }
  </style>
  