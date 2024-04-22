<template>
    <div class="container d-flex justify-content-center align-items-center" style="min-height: 100vh;">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Paguaj Kesh</h2>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" v-model="values.email" required>
                <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
              </div>
              <div class="form-group">
                <label for="qyteti">Qyteti</label>
                <input type="text" class="form-control" id="qyteti" v-model="values.qyteti" required>
                <div class="invalid-feedback" v-if="errors.qyteti">{{ errors.qyteti }}</div>
              </div>
              <div class="form-group">
                <label for="shuma">Shuma</label>
                <input type="text" class="form-control" id="shuma" v-model="values.shuma" readonly>
              </div>
              <br>
              <button class="btn btn-primary btn-lg btn-block custom-button pb-5 col-3" type="submit">Paguaj</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        values: {
          qyteti: '',
          email: '',
          shuma: '',
        },
        errors: {},
      };
    },
    methods: {
      async handleSubmit() {
        if (this.values.email === '' || this.values.qyteti === '') {
          alert('Ju lutem plotësoni fushat!');
          return;
        }
  
        // Regex validation
        const regexQyteti = /^[A-Za-z]+$/;
        const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  
        if (!regexEmail.test(this.values.email)) {
          this.errors.email = 'Emaili jo valid!';
          return;
        } else {
          this.errors.email = null;
        }
  
        if (!regexQyteti.test(this.values.qyteti)) {
          this.errors.qyteti = 'Vlera e qytetit jo valide!';
          return;
        } else {
          this.errors.qyteti = null;
        }
  
        try {
          const response = await axios.post(`http://localhost:5051/donation/personat/${this.values.email}`, {
            qyteti: this.values.qyteti,
            shuma: this.values.shuma,
          });
          alert(response.data.message);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  