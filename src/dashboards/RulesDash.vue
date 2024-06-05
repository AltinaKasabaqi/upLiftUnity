<template>
     <RouterLink to="/RulesForma">
      <button class="add-btn">Shto rregull <i class="fas fa-plus"></i></button>
    </RouterLink>
    <div class="container">
      <table>
        <thead>
          <tr>
            <th>Rregullat</th>
            <th>Pershkrimi</th>
            <th v-if="userRole === 'SuperAdmin'">Veprimet</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rule in rules" :key="rule.id">
            <td>{{ rule.ruleName }}</td>
            <td>{{ rule.ruleDesc }}</td>
            <td class="actions" v-if="userRole === 'SuperAdmin'">
              <button class="btn-edit" @click="editRule(rule)">Edit</button>
              <button class="delete-btn" @click="deleteRule(rule.ruleId)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <modal
        v-if="showModal"
        :show-modal="showModal"
        :editing-rule="editingRule"
        @update-rule="updateRule"
        @cancel-edit="cancelEdit"
      ></modal>
    </div>
  </template>
  
  
  <script>
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from './updateRule.vue'; 
import {geRoleFromToken} from '../authorization/authRoleId.js'

export default {
  components: {
    Modal,
  },
  data() {
    return {
      rules: [],
      editingRule: null,
      showModal: false,
      userRole:geRoleFromToken()
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:5051/api/rules/GetRules');
        this.rules = response.data;
      } catch (error) {
        console.error('Gabim gjatë marrjes së të dhënave:', error);
      }
    },
    editRule(rule) {
      this.editingRule = { ...rule }; 
      console.log(this.editingRule.ruleId);
      this.showModal = true; 
      document.body.classList.add('modal-open');
    },
    async deleteRule(ruleId) {
      Swal.fire({
        title: "Fshije Rregullin",
        text: "A je i sigurt që dëshiron të fshish këtë rregull?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Po, fshije!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://localhost:5051/api/rules/DeleteRule/${ruleId}`);
            this.fetchData();
            Swal.fire("Success", "Rregulli u fshi me sukses!", "success");
          } catch (error) {
            console.error("Error deleting rule:", error);
            Swal.fire("Error", "Gabim gjatë fshirjes!", "error");
          }
        }
      });
    },
    updateRule(updatedRule) {
      this.editingRule = { ...updatedRule }; 
      this.showModal = false;
      this.fetchData();
      document.body.classList.remove('modal-open');
    },
    cancelEdit() {
      this.editingRule = null; 
      this.showModal = false; 
      document.body.classList.remove('modal-open');
    }
  }
};
</script>

  <style scoped>
  .container {
    margin: 20px auto;
    width: 70%;
  }
  
  table {
    width: 80%;
    margin-left: 8%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  td {
    text-align: center;
    font-size: 1.2em;
  }
  .delete-btn,
  .add-btn {
    padding: 8px 12px;
    margin-right: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .btn-edit {
    padding: 8px 12px;
    margin-right: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    border: solid 1px #007bff; 
    color: black;
    font-size: 14px;
    background-color: white;
}
  .delete-btn {
    border:solid 1px #f44336;
    color: black;
    font-size: 14px;
    background-color: white;
  }
  
  .add-btn {
    background-color: #9ab59a;
    color: white;
    margin-left:21%;
    
    
  }
  </style>
  