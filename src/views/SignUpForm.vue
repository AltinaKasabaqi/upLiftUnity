<template>
  <div>
    <div class="form-container">
      <h2 class="title">Regjistro Stafin</h2>
      <div v-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>
      <form @submit.prevent="submitForm" class="content">
        <div class="left">
          <div class="form-group">
            <label for="emri">Emri:</label>
            <input type="text" id="emri" v-model="formData.name" required />
          </div>
          <div class="form-group">
            <label for="mbiemri">Mbiemri:</label>
            <input
              type="text"
              id="mbiemri"
              v-model="formData.surname"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="formData.email" required />
          </div>
          <div class="form-group">
            <label for="fjalekalimi">Fjalëkalimi:</label>
            <div class="password-input">
              <input
                id="fjalekalimi"
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                required
              />
              <span class="password-toggle" @click="togglePasswordVisibility">
                <i class="fas" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
              </span>
            </div>
          </div>
          <div class="form-group">
            <label for="phoneNumber">Numri i telefonit:</label>
            <input type="tel" id="phoneNumber" v-model="formData.phoneNumber" />
          </div>
          <div class="form-group">
            <label for="address">Adresa:</label>
            <input type="text" id="address" v-model="formData.address" />
          </div>
          <div class="form-group">
            <label for="roli">Roli:</label>
            <select id="roli" v-model="formData.RoleId" required>
              <option value="">Zgjidh Rolin</option>
              <option value="2">Mbikqyrës</option>
              <option value="3">Vullnetarë</option>
            </select>
          </div>
          <button type="submit">Regjistrohu</button>
        </div>
        <div class="right"></div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "../api/axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      formData: {
        name: "",
        surname: "",
        email: "",
        RoleId: "",
        password: "",
        phoneNumber: "",
        address: "",
      },
      errorMessage: "",
      showPassword: false,
    };
  },
  created() {

    const acceptedApplicationId = localStorage.getItem("acceptedApplicationId");

    if (acceptedApplicationId) {
      axios
        .get(`http://localhost:5051/api/applications/GetApplicationById/${acceptedApplicationId}`)
        .then((response) => {

          const application = response.data;

          if (application.nameSurname && typeof application.nameSurname === "string") {

            const nameSurnameParts = application.nameSurname.split(" ");

            this.formData.name = nameSurnameParts[0] || "";
            this.formData.surname = nameSurnameParts.slice(1).join(" ") || "";
          }

          this.formData.email = application.email;
          this.formData.phoneNumber = application.phoneNumber;
          this.formData.password = this.generateRandomPassword();

        
          if (application.applicationType === "Supervisor") {
            this.formData.RoleId = "2"; 
          } else if (application.applicationType === "Vullnetare") {
            this.formData.RoleId = "3"; 
          } else {
            this.formData.RoleId = "";
          }
        })
        .catch((error) => {
          console.error("Error fetching application data:", error);
        });
    }
  },
  methods: {
    generateRandomPassword(length = 8) {
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      return password;
    },
    async submitForm() {
      try {
        const response = await axios.post("http://localhost:5051/api/users", this.formData);
        if (response && response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: "Success",
            text: "Përdoruesi u regjistrua me sukses!",
          });
          this.$router.push({ name: "AllUsers" });
        }
      } catch (error) {
        console.error("Gabim në regjistrim:", error.response.data);
        await Swal.fire({
          icon: "error",
          title: "Registration Error",
          text: error.response.data || "Gabim gjatë regjistrimit!",
        });
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
.form-container {
  width: 40%;
  margin: 5% auto;
  border: solid 1px rgb(219, 219, 219);
  border-radius: 5%;
  padding: 5%;
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
  font-size: 18px;
  color: #4c4c4c;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"],
select {
  width: 100% ;
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

select {
  width: 105%;
}

button {
  display: block;
  width: 105%;
  padding: 12px;
  background-color: #b8ddbe;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 16px;
}

button:hover {
  background-color: #52a086;
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

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
}

.password-toggle:hover {
  color: #333;
}
</style>
