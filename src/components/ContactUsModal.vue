<template>
  <div>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Na Kontakto</h2>
          <router-link to="/"><button @click="closeModal">X</button></router-link>          
        </div>
        <div class="modal-content">
          <div class="company-info">
            <!-- <h3>Kontakto Kompaninë</h3> -->
            <div class="contact-info">
              <div class="contact-item">
                <img src="@/assets/Call.icon.jpg" alt="Ikona e telefonit" class="phone-icon">
                <span>Telefono: +311 222 345</span>
              </div>
              <div class="contact-item">
                <img src="@/assets/email.icon.jpg" alt="Ikona e emailit" class="email-icon">
                <span>Email: UpLiftUnity@outlook.com</span>
              </div>
            </div>
            <p> Ne jemi të hapur për një bisedë</p>
            <img src="@/assets/usamap.jpg" alt="Lokacioni">
          </div>
          <!-- Forma për të plotësuar aplikuesit -->
          <div class="applicant-form">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="nameSurname">Emri & Mbiemri:</label>
                <input type="text" id="nameSurname" v-model="formData.nameSurname" required>
              </div>
              <div class="form-group">
                <label for="email">Emaili:</label>
                <input type="email" id="email" v-model="formData.email" required>
              </div>
              <div class="form-group">
                <label for="phoneNumber">Numri i Telefonit:</label>
                <input type="tel" id="phoneNumber" v-model="formData.phoneNumber" required>
              </div>
              <button type="submit">Dërgo</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: true,
      formData: {
        nameSurname: '',
        email: '',
        phoneNumber: ''
      }
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    submitForm() {
      console.log(this.formData);
      this.closeModal();
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(235, 246, 238, 0.927);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-container {
  background: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  width: 800px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.modal-header h2 {
  font-size: 200%;
  margin: 0;
  color: #333;
}

.modal-header button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #cb3434;
}

.modal-header button:hover {
  color: #555;
}

.modal-content {
  margin-bottom: 20px;
  display: flex;
}

.company-info {
  flex: 1;
  padding-right: 20px;
}

.applicant-form {
  flex: 1;
}

.contact-info {
  font-size: 110%;
  line-height: 1.5;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}

.contact-item img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.company-info img {
  max-width: 50%;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-group input {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button[type="submit"] {
  background-color: #52a086;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  /* margin-left: 40%; */
}

button[type="submit"]:hover {
  background-color: #b8ddbe;
}
</style>
