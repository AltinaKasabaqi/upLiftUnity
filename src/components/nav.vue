<template>
  <nav class="navbar">
    <img src="../assets/logo-no-background.png" alt="Logo" class="logo" />
    <ul>
      <li><a href="default.asp">Rreth nesh</a></li>
      <li><a href="#">Na kontakto</a></li>
      <li><router-link to="/applicationForm">Bëhu vullnetarë</router-link></li>
      <li><a href="#" @click="redirectToStripe">Dhuro</a></li> 
    </ul>
  </nav>
  <modal
      v-if="showModal"
      :show-modal="showModal"
      :editing-donation="editingDonation"
      @update-donation="updateDonation"
      @cancel-edit="cancelEdit"
    ></modal>
</template>

<script>
import Modal from "../dashboards/updateDonation.vue"; 
export default {
  name: "NavBar",
  components:{
    Modal
  },

  methods: {
    async redirectToStripe() {
  console.log("HI");
    fetch('http://localhost:8080/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 1 }, 
        ],
      }),
    })
      .then(res => {
     
        if (res.ok) return res.json();
        return res.json().then(json => Promise.reject(json));
        
      })
      .then(({ url }) => {
        console.log("Hi");
      
        window.location = url;
      })
      .catch(e => {
        console.error(e.error);
      });
  }
  }
};
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
}

.navbar {
  overflow: hidden;
  background-color: transparent;
  margin-top: 0;
  padding: 0;
}

.logo {
  float: left; 
  height: 11vh; 
  margin: 2%; 
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.navbar li {
  float: right;
}

.navbar li a {
  display: block;
  color: black;
  text-align: center;
  padding: 50px;
  text-decoration: none;
  font-size: 25px;
}

.navbar li a:hover {
  color: rgb(102, 102, 102);
}
</style>
