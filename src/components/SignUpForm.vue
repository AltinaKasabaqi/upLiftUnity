<template>
    <NavBar></NavBar>
    <!-- <div class="container">
      <div class="title">
        <h1>Regjistrohu</h1>
      </div>
      <div class="content">
        <div class="right">
          <div class="form-container">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="firstname">Emri:</label>
                <input type="text" id="firstname" v-model="formData.firstname" required>
              </div>
              <div class="form-group">
                <label for="lastname">Mbiemri:</label>
                <input type="text" id="lastname" v-model="formData.lastname" required>
              </div>
              <div class="form-group">
                <label for="email">Emaili:</label>
                <input type="email" id="email" v-model="formData.email" required>
              </div>
              <div class="form-group">
                <label for="password">Fjalëkalimi:</label>
                <input type="password" id="password" v-model="formData.password" required>
              </div>
              <div class="form-group">
                <label for="confirmPassword">Konfirmo Fjalëkalimin:</label>
                <input type="password" id="confirmPassword" v-model="formData.confirmPassword" required>
              </div>
              <button type="submit">Regjistrohu</button>
            </form>
          </div>
        </div>
      </div>
    </div> -->
    <form action="/regjistrohu" method="post">
        <label for="emri">Emri:</label><br>
        <input type="text" id="emri" name="emri" required><br>

        <label for="mbiemri">Mbiemri:</label><br>
        <input type="text" id="mbiemri" name="mbiemri" required><br>

        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br>

        <label for="fjalekalimi">Fjalëkalimi:</label><br>
        <input type="password" id="fjalekalimi" name="fjalekalimi" required><br>

        <label for="konfirmo_fjalekalimin">Konfirmo Fjalëkalimin:</label><br>
        <input type="password" id="konfirmo_fjalekalimin" name="konfirmo_fjalekalimin" required><br>

        <input type="submit" value="Regjistrohu">
    </form>
    <PageFooter></PageFooter>
  </template>
  
  <script>
  import NavBar from './nav.vue';
  //import PageFooter from './footer.vue'
 
  export default {
    
    components:{
      NavBar
    }
  };
  </script>
  
  <style scoped>
  /* Stili i vendeve për të ruajtur input-et dhe textarea */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid 1px rgb(141, 141, 141);
    border-radius: 30px;
    margin: 10%;
    padding: 3%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
  
  .title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .content {
    display: flex;
    flex-wrap: wrap;
  }
  
  .left {
    flex: 1;
  }
  
  .right {
  flex: 1;
  display: flex;
  justify-content: center; /* vendos formën në qendër */
}
  
  .image-container {
    padding: 20px;
    width: 50%;
  }
  
  .image-container>img{
    width: 100%;
  }
  .form-container {
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%; /* Ndërro width-in sipas preferencave tuaja */
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
  }
  
  button {
    padding: 10px 20px;
    background-color: #B8DDBE;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #52A086;
  }
  </style>
  