<template>
  <div>
    <div class="dashboard">
      <div class="header">
        <h1>Donacionet</h1>
      </div>
      <div class="table-container">
        <div class="custom-table">
          <table>
            <thead>
              <tr>
                <th>Emri dhe Mbiemri</th>
                <th>Email</th>
                <th>Adresa</th>
                <th>Shuma ($)</th>
                <th>Data</th>
                <th>Veprimet</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="donation in paginatedDonations"
                :key="donation.donationID"
              >
                <td>{{ donation.nameSurname }}</td>
                <td>{{ donation.email }}</td>
                <td>{{ donation.address }}</td>
                <td>{{ donation.amount }}</td>
                <td>{{ formatDate(donation.date) }}</td>
                <td class="actions">
                  <button
                    class="btn-view"
                    @click="viewDonation(donation.donationID)"
                  >
                    View
                  </button>
                  <button class="btn-edit" @click="editDonation(donation)">
                    Edit
                  </button>
                  <button
                    class="btn-delete"
                    @click="deleteDonation(donation.donationID)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="pagination">
        <button
          class="btn btn-prev"
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ pageCount }}</span>
        <button
          class="btn btn-next"
          :disabled="currentPage === pageCount"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </div>
    <modal
      v-if="showModal"
      :show-modal="showModal"
      :editing-donation="editingDonation"
      @update-donation="updateDonation"
      @cancel-edit="cancelEdit"
    ></modal>
  </div>
</template>


<script>
import axios from "../api/axios.js";
import Swal from "sweetalert2";
import Modal from "./updateDonation.vue"; 



export default {
  components: {
    Modal,
    // NotificationBar,
  },
  data() {
    return {
      donations: [],
      currentPage: 1,
      pageSize: 10,
      editingDonation: null,
      showModal: false,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.donations.length / this.pageSize);
    },
    paginatedDonations() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.donations.slice(start, end);
    },
  },
  mounted() {
    this.getDonations();
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("en-US");
    },
    async getDonations() {
      try {
        const response = await axios.get("http://localhost:5051/api/donations/GetDonations");
        this.donations = response.data;
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.pageCount) this.currentPage++;
    },
    viewDonation(donationId) {
      console.log("Viewing donation:", donationId);
    },
    editDonation(donation) {
      this.editingDonation = { ...donation }; 
      this.showModal = true; 
      document.body.classList.add('modal-open');
    },
    cancelEdit() {
      this.editingDonation = null; 
      this.showModal = false; 
       document.body.classList.remove('modal-open');
    },
    async deleteDonation(donationId) {
      Swal.fire({
        title: "Fshije Donacionin",
        text: "A je i sigurt që dëshiron të fshish këtë donacion?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Po, fshije!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://localhost:5051/api/donations/DeleteDonation?id=${donationId}`);
            this.getDonations();
            Swal.fire("Success", "Donacioni u fshi me sukses!", "success");
          } catch (error) {
            console.error("Error deleting donation:", error);
            Swal.fire("Error", "Gabim gjatë fshirjes!", "error");
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.dashboard {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.table-container {
  overflow-x: auto;
}

.custom-table {
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
}

th,
td {
  padding: 15px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  color: rgb(0, 0, 0);
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.actions {
  display: flex;
  gap: 10px;
}

.btn-view,
.btn-edit,
.btn-delete {
  border: none;
  padding: 10px 20px;
  margin: 0;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-view {
  background-color: #caf5cc;
  color: white;
}

.btn-edit {
  background-color: #f7f6cb;
  color: white;
}

.btn-delete {
  background-color: #fabdbb;
  color: rgb(255, 255, 255);
}

.btn-prev,
.btn-next {
  color: rgb(0, 0, 0);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  border: solid 1px #000000;
  background-color: white;
}

.btn-prev:disabled,
.btn-next:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
