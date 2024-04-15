<template>
  <div class="modal" :class="{ 'is-active': showModal }">
    <div class="modal-background" @click="cancelEdit"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="title is-3">Rifresko të dhënat</h2>
        <div v-if ="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
    </div>
      </div>
      <form @submit.prevent="updateDonation" class="form">
        <div class="field">
          <label class="label">Emri dhe Mbiemri:</label>
          <div class="control">
            <input
              class="input is-rounded custom-input"
              type="text"
              v-model="editedDonation.nameSurname"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Email:</label>
          <div class="control">
            <input
              class="input is-rounded custom-input"
              type="email"
              v-model="editedDonation.email"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Adresa:</label>
          <div class="control">
            <input
              class="input is-rounded custom-input"
              type="text"
              v-model="editedDonation.address"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Shuma ($):</label>
          <div class="control">
            <input
              class="input is-rounded custom-input"
              type="number"
              v-model="editedDonation.amount"
              required
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Data:</label>
          <div class="control">
            <input
              class="input is-rounded custom-input"
              type="date"
              v-model="editedDonation.date"
              required
            />
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary is-rounded" type="submit">
              Rifresko të dhënat
            </button>
          </div>
          <div class="control">
            <button
              class="button is-danger is-rounded"
              type="button"
              @click="cancelEdit"
            >
              Anulo
            </button>
          </div>
        </div>
      </form>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="cancelEdit"
    ></button>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  props: ["showModal", "editingDonation"],
  data() {
    return {
      editedDonation: { ...this.editingDonation },
    };
  },
  methods: {
    async updateDonation() {
        try{
            //Used for debuggingf
        console.log(this.editedDonation.nameSurname, this.editedDonation.email, this.editedDonation.date, this.editedDonation.amount);
            
            await axios.put('/donations/UpdateDonation', this.editedDonation);

            this.$emit("update-donation", this.editedDonation);
            
            this.showSuccessAlert();
            window.location.reload();

        }catch(error){
            console.error('Gabim gjatë rifreskimit të të dhënave:', error);
            
        }
    },
    cancelEdit() {
      this.$emit("cancel-edit");
    },
    showSuccessAlert() {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Donation updated successfully!",
        timer: 2000,
        timerProgressBar: true,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
      });
    },
  },
  watch: {
    editingDonation(newValue) {
      this.editedDonation = { ...newValue };
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 2px 4px rgba(83, 77, 77, 0.1);
  transition: box-shadow 0.3s ease;
}

.modal-content:hover {
  box-shadow: 0 4px 8px rgba(134, 125, 125, 0.2);
}

.modal-header {
  text-align: center;
  margin-bottom: 30px;
  color:rgb(15, 153, 102);
}

.form {
  margin-bottom: 15px;
}

.field {
  margin-bottom: 10px;
  text-align: center;

}

.label {
  font-weight: bold;
  color: #6a6363;
  border-color:aquamarine;
}

.button {
  border-radius: 5px;
  transition: transform 0.3s ease;
  border:none;
}

.button:hover {
  transform: translateY(-2px);
}

.is-grouped {
  justify-content: center;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.input.is-rounded {
  border-radius: 5px;
  box-shadow: none;
}

.custom-input {
  border: 1px solid #dbdbdb;
  padding: 7px 12px;
}

.custom-input:focus {
  border-color: #3273dc;
  box-shadow: 0 0 0 0.1em rgba(50, 115, 220, 0.25);
}

/* Button Colors */
.button.is-primary {
  background-color: #52a086;
  color: white;
  margin-bottom: 8px;
  margin-top: 8px;
  padding: 8px
}

.button.is-danger {
  background-color: #f16d64;
  color: rgb(255, 255, 255);
  padding: 8px;
}
</style>
