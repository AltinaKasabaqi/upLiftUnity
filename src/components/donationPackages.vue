<template>
  <NavBar></NavBar>
  <center>
    <div class="all">
      <div
        class="package-card"
        v-for="donationPackage in packages"
        :key="donationPackage.id"
        @click="redirectToStripe(donationPackage)"
      >
        <img src="../assets/dd.jpg" alt="Package Image" />
        <div class="package-details">
          <h3>{{ donationPackage.name }}</h3>
          <p>€{{ donationPackage.price }}</p>
        </div>
      </div>
      <h1>Zgjedhni pakon tuaj të donacionit!</h1>
    </div>
  </center>
</template>

<script>
import axios from "../api/axios";
import NavBar from "./nav.vue";
export default {
  data() {
    return {
      packages: [
        { id: 1, name: "Pako 1", price: 100 },
        { id: 2, name: "Pako 2", price: 200 },
        { id: 3, name: "Pako 3", price: 300 },
      ],
    };
  },
  components: {
    NavBar,
  },
  methods: {
    async redirectToStripe(selectedPackage) {
      try {
        const response = await axios.post('http://localhost:5051/api/donations/CreateCheckoutSession/' + selectedPackage.id);
       
        const { url,sessionId } = response.data;

        localStorage.setItem("sessionId", sessionId);

        window.location = url;
      } catch (error) {
        console.error("Error creating Stripe Checkout session:", error);
      }
    },
    getImageUrl(packageId) {
      return this.imageUrls[packageId];
    }
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    const successParam = urlParams.get("success");

    if (successParam === "true") {
     
      const sessionId = localStorage.getItem("sessionId");

      // Make a POST request to webhook endpoint using fetch cause it has to be "POST" method so stripe can work.Webhook-u e kerkon!
      fetch(
        `http://localhost:5051/api/donations/webhook?session_id=${sessionId}&success=true`,
        {
          method: "POST",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
     
        })
        .catch((error) => {
          console.error("Error calling webhook:", error);
        });

  
      window.location.href = "http://localhost:8080/#/";
    }
  },
};
</script>

<style scoped>
.all {
  display: inline;
}
.package-card {
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 80px;
  padding: 50px;
  width: 12%;
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

h1 {
  display: flex;
  justify-content: center;
  color: rgb(0, 0, 0);
  font-size: 28px;
  margin-top: 0%;
}
</style>
