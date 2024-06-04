<template>
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background" @click="cancelEdit"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="title is-3">Rifresko Rregullin</h2>
          <div v-if="errorMessage" class="alert alert-danger">
            {{ errorMessage }}
          </div>
        </div>
        <form @submit.prevent="updateRule" class="form">
          <div class="field">
            <label class="label">Emri i Rregullit:</label>
            <div class="control">
              <input
                class="input is-rounded custom-input"
                type="text"
                v-model="editedRule.ruleName"
                required
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Përshkrimi:</label>
            <div class="control">
              <textarea
                class="textarea is-rounded custom-input"
                v-model="editedRule.ruleDesc"
                required
              ></textarea>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-primary is-rounded" type="submit">
                Rifresko Rregullin
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
    props: ["showModal", "editingRule"],
    data() {
      return {
        editedRule: { ...this.editingRule },
      };
    },
    methods: {
      async updateRule() {
        try {
          await axios.put(`http://localhost:5051/api/rules/UpdateRule/${this.editedRule.ruleId}`, this.editedRule);
          this.$emit("update-rule", this.editedRule);
          this.showSuccessAlert();
          this.cancelEdit();
        } catch (error) {
          console.error('Gabim gjatë rifreskimit të të dhënave:', error);
        }
      },
      cancelEdit() {
        this.$emit("cancel-edit");
      },
      showSuccessAlert() {
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: "Rregulli u rifreskua me sukses!",
          timer: 2000,
          timerProgressBar: true,
          toast: true,
          position: "top-end",
          showConfirmButton: false,
        });
      },
    },
    watch: {
      editingRule(newValue) {
        this.editedRule = { ...newValue };
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
    color: rgb(15, 153, 102);
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
    border-color: aquamarine;
  }
  
  .button {
    border-radius: 5px;
    transition: transform 0.3s ease;
    border: none;
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
  
  .textarea.is-rounded {
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
  

  .button.is-primary {
    background-color: #52a086;
    color: white;
    margin-bottom: 8px;
    margin-top: 8px;
    padding: 8px;
  }
  
  .button.is-danger {
    background-color: #f16d64;
    color: rgb(255, 255, 255);
    padding: 8px;
  }
  </style>
  