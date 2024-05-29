<template>
    <div>
      <div class="container">
        <h2 class="title">Modifiko thirrjen</h2>
        <div v-if="errorMessage" class="alert alert-danger">
          {{ errorMessage }}
        </div>
        <form @submit.prevent="updateCall" class="content">
          <div class="left">
            <div class="form-group">
              <label for="CallerNickname">Nickname</label>
              <input type="text" id="CallerNickname" v-model="formData.callerNickname" required>
            </div>
            <div class="form-group">
              <label for="Description">Tema e Bisedës:</label>
              <input type="text" id="Description" v-model="formData.description" required>
            </div>
            <div class="form-group">
              <label for="RiskLevel">Shkalla e rrezikut:</label>
              <input type="int" id="RiskLevel" v-model="formData.riskLevel" required>
            </div>
            <button type="submit">Ndrysho</button>
          </div>
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
        callerNickname: '',
        description: '',
        riskLevel: 0
      },
      errorMessage: '',
      callId:''
    };
  },
   created(){
        const callId = this.$route.params.id;
        this.fetchCall(callId);
        console.log(callId + "aksdkajs");
    
   },
    methods: {
      fetchCall(callId){
        axios.get(`http://localhost:5051/calls/${callId}`)
          .then(response => {
            this.formData = response.data;
          
          })
          .catch(error => {
            console.error('Gabim gjatë marrjes së të dhënave:', error);
          });
      },
       async updateCall() {
        const callId = this.$route.params.id;
            console.log(callId);
            
            axios.put(`http://localhost:5051/calls/Update/${callId}`,this.formData)
            .then( response => {
                console.log(response);
                this.$router.push('/callsHistory');
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
  