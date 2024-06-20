<template>
    <div>
      <div class="container">
        <h2 class="title">Modifiko planetin</h2>
        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        <form @submit.prevent="updatePlanet" class="content">
          <div class="left">
            <!-- <div class="form-group">
              <label for="name">name</label>
              <input type="text" id="name" required>
            </div> -->
            <div class="form-group">
              <label for="newType">Type</label>
              <input type="text" id="newType" v-model="formData.newType" required>
            </div>
            <button type="submit">Ndrysho</button></div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '../api/axios';
  
  export default {
    components: {},
    data() {
    return {
      formData: {
        // name: '',
        newType: '',
        
      },
      nameP:'',
      errorMessage: '',
      
    };
  },
   created(){
       const nameP= this.$route.params.name;
//         this.fetchCall(callId);
        console.log(nameP + "aksdkajs");
    
  },
    methods: {
    //   fetchCall(callId){
    //     axios.get(`http://localhost:5051/calls/${callId}`)
    //       .then(response => {
    //         this.formData = response.data;
          
    //       })
    //       .catch(error => {
    //         console.error('Gabim gjatë marrjes së të dhënave:', error);
    //       });
    //   },
       async updatePlanet() {
        const nameP = this.$route.params.name;
            console.log(nameP);
            
            axios.put(`http://localhost:5051/api/planets/${nameP}/type`,this.formData
            )
            .then( response => {
                console.log(response);
                
            })
            .catch(error =>{
                console.error('error',error);
            })
  
  }
}
};
    
  </script>
  
  
  <style scoped>
  .container {
    width: 40%;
    margin: 10% auto;
  }
  
  .title {
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input[type="int"],
  input[type="text"],
  select {
    width: calc(100% - 22px);
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  select {
    width: 100%;
  }
  
  button {
    display: block;
    width: 100%;
    padding: 8px;
    background-color: #B8DDBE;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: #52A086;
  }
  
  .alert {
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 5px;
  }
  
  .alert-danger {
    background-color: #f8d7da;
    border-color: #f5c6cb;
    color: #721c24;
  }
  </style>
  