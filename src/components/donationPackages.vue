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
          1: "./assets/3 1.png",
          2: "./assets/donation2.gif",
          3: "./assets/donation3.gif"
        }
      };
    },
    methods: {
    async redirectToStripe(selectedPackage) {
      try {
        const response = await axios.post('http://localhost:5051/api/donations/CreateCheckoutSession/' + selectedPackage.id);
        const { url,sessionId } = response.data;

        localStorage.setItem('sessionId', sessionId);


        window.location = url;
      } catch (error) {
        console.error(error);
      }
    },
      getImageUrl(packageId) {
        return this.imageUrls[packageId] || '';
      }
    },
    created() {
  
  const urlParams = new URLSearchParams(window.location.search);
  const successParam = urlParams.get('success');
  
  if (successParam === 'true') {
    // Retrieve the session ID from localStorage
    const sessionId = localStorage.getItem('sessionId');
    
    // Make a POST request to webhook endpoint using fetch cause it has to be "POST" method so stripe can work.Webhook-u e kerkon! 
    fetch(`http://localhost:5051/api/donations/webhook?session_id=${sessionId}&success=true`, {
      method: 'POST'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Handle successful response
      })
      .catch(error => {
        console.error('Error calling webhook:', error);
      });
    
    // Redirect to homepage
    window.location.href = 'http://localhost:8080/#/';
  }
}



  };
  </script>
  
  <style scoped>
  .package-card {
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 80px;
    padding: 50px;
    width: 300px;
    cursor: pointer;
  
  }
  
  .package-card img {
    width: 100%;
    height: auto;
    border-radius: 5px 5px 0 0;
  }
  
  .package-details {
    padding: 20px;
  
  }
  
  .package-details h3 {
    margin-top: 10px;
  }
  
  .package-details p {
    margin: 5px 0;
  }

  h1{
    display: flex;
    justify-content: center;
    color: rgb(9, 105, 105);
  }

  </style>
  