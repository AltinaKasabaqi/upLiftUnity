<template>
  <div>
    <NavBar></NavBar>
    <div class="container">
      <h2 class="title">Regjistro Stafin</h2>
      <form action="/regjistrohu" method="post" class="content">
        <div class="left">
          <div class="form-group">
            <label for="emri">Emri:</label>
            <input type="text" id="emri" name="emri" required>
          </div>
          <div class="form-group">
            <label for="mbiemri">Mbiemri:</label>
            <input type="text" id="mbiemri" name="mbiemri" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="fjalekalimi">Fjalëkalimi:</label>
            <input type="password" id="fjalekalimi" name="fjalekalimi" required>
          </div>
          <!-- 
          <div class="form-group">
            <label for="konfirmo_fjalekalimin">Konfirmo Fjalëkalimin:</label>
            <input type="password" id="konfirmo_fjalekalimin" name="konfirmo_fjalekalimin" required>
          </div>
          -->
          <button type="submit">Regjistrohu</button>
        </div>
        <div class="right">
          <!-- Vendosni një imazh ose përmbajtje të tjera këtu -->
        </div>
      </form>
    </div>
    <PageFooter></PageFooter>
  </div>
</template>

<script>
import NavBar from './nav.vue';
import PageFooter from './footer.vue';

export default {
  components: {
    NavBar,
    PageFooter
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  padding: 3%; 
  box-shadow: 0px 0px 10px rgba(45, 9, 36, 0.2);
  margin: auto; 
}

.title {
  text-align: center;
  margin: 20px 0;
  font-size: 24px;
}

.content {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  background-color: #ffffff; 
  border-radius: 10px; 
  /* padding: 20px; Zgjerimi i brendshëm */
  margin: 10px; /* Zgjerimi i jashtëm */
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%; /* Zgjerimi i fushës në të dy anët */
  padding: 10px; /* Padding të barabartë në të dy anët */
  border: 1px solid #c3a6ff;
  border-radius: 5px;
  text-align: center;
  background: linear-gradient(to bottom, #ffffff, #f2f2f2);
  /* margin: 5px 0; Margin për të ndarë fushat */
}

button {
  width: calc(100% - 20px);
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
