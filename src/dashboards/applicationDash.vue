<template>
  <div id="app">
    <h1>Aplikimet</h1>
    <div>
      <label for="filterType">Filtro aplikimet:</label>
      <select v-model="selectedType" id="filterType">
        <option value="">Të gjitha</option>
        <option value="supervisor">Supervisor</option>
        <option value="vullnetare">Vullnetare</option>
      </select>
    </div>
    <table>
      <thead>
        <tr>
          <th>Emri & Mbiemri</th>
          <th>Email</th>
          <th>Nr_Tel</th>
          <th>CV</th>
          <th>Pozita</th>
          <th>Statusi</th>
          <th>Shqyrtuar</th>
          <th>Veprim</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="application in allApplications"
          :key="application.applicationId"
        >
          <td>{{ application.nameSurname }}</td>
          <td>{{ application.email }}</td>
          <td>{{ application.phoneNumber }}</td>
          <td>{{ application.cv }}</td>
          <td>{{ application.applicationType }}</td>
          <td>{{ application.applicationStatus }}</td>
          <td>
            <button
              @click="reviewedApplication(application)"
              :disabled="application.isReviewed"
              class="btn"
            >
              <i class="fas fa-check"></i>
            </button>
          </td>
          <td>
            <button
              @click="acceptApplication(application)"
              :disabled="application.isAccepted || application.isRejected || !application.isReviewed"
              class="btn2 accept-btn"
            >
              Pranuar
            </button>
            <button
              @click="rejectApplication(application)"
              :disabled="application.isRejected || application.isAccepted || !application.isReviewed"
              class="btn2 reject-btn"
            >
              Refuzuar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "../api/axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      allApplications: [],
      selectedType: ""
    };
  },
  created() {
    this.fetchApplications();
  },
  watch: {
    selectedType() {
      this.fetchByType();
    },
  },
  methods: {
    updateStatus(id, status) {
      const url = `http://localhost:5051/api/applications/UpdateApplication/${id}?status=${encodeURIComponent(
        status
      )}`;
      axios
        .put(url)
        .then((response) => {
          console.log(response.data);
          this.fetchApplications(); 
          if (status === "Pranuar") {
            localStorage.setItem('acceptedApplicationId', id);
            window.location.href = "http://localhost:8080/#/register";
          }
        })
        .catch((error) => {
          console.error("Error during PUT request:", error);
        });
    },
    reviewedApplication(application) {
      if (!application.isReviewed) {
        this.showUpdateAlert(application.applicationId, "Shqyrtuar");
      }
    },
    acceptApplication(application) {
      if (application.isReviewed && !application.isRejected) {
        this.showUpdateAlert(application.applicationId, "Pranuar");
      }
    },
    rejectApplication(application) {
      if (application.isReviewed && !application.isAccepted) {
        this.showUpdateAlert(application.applicationId, "Refuzuar");
      }
    },
    showUpdateAlert(id, status) {
      Swal.fire({
        title: "Konfirmo",
        icon: "question",
        iconColor: "gray",
        titleAttributes: {
          fontFamily: "Open Sans, sans-serif",
        },
        showCancelButton: true,
        confirmButtonColor: "#70a090",
        cancelButtonColor: "rgba(255, 99, 132, 1)",
        confirmButtonText: "Ndrysho!",
        cancelButtonText: "Anulo",
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateStatus(id, status);
        }
      });
    },
    fetchApplications() {
      axios
        .get("http://localhost:5051/api/applications/GetApplications")
        .then((response) => {
          this.allApplications = response.data.map(application => ({
            ...application,
            isReviewed: application.applicationStatus !== 'e pa shqyrtuar',
            isAccepted: application.applicationStatus === 'Pranuar',
            isRejected: application.applicationStatus === 'Refuzuar'
          }));
        })
        .catch((error) => {
          console.error("Gabim gjatë marrjes së të dhënave:", error);
        });
    },
    fetchByType() {
      if (
        this.selectedType === "vullnetare" ||
        this.selectedType === "supervisor"
      ) {
        axios
          .get(
            `http://localhost:5051/api/applications/GetApplicationByType?type=${this.selectedType}`
          )
          .then((response) => {
            this.allApplications = response.data.map(application => ({
              ...application,
              isReviewed: application.applicationStatus !== 'e pa shqyrtuar',
              isAccepted: application.applicationStatus === 'Pranuar',
              isRejected: application.applicationStatus === 'Refuzuar'
            }));
          })
          .catch((error) => {
            console.error("Gabim gjatë marrjes së të dhënave:", error);
          });
      } else {
        this.fetchApplications();
      }
    },
  },
};
</script>

<style scoped>
#app {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table th,
table td {
  padding: 10px;
  border: 1px solid #828282;
}

table th {
  background-color: #e9e9e9;
  font-weight: bold;
  color: black;
}

.edit-btn,
.delete-btn,
.add-btn {
  padding: 8px 12px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn {
  background-color: #87cefa;
  color: white;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.add-btn {
  background-color: #778899;
  color: white;
}
.btn {
  padding: 8px 12px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  border: solid 1px rgb(43, 43, 43);
  box-shadow: 5px 5px 10px rgba(71, 71, 71, 0.2);
}

.btn2{
  width: 100%;
  margin: 2%;
  padding: 5%;
  border-radius: 4px;
  cursor: pointer;
  border: solid 1px rgb(43, 43, 43);
  box-shadow: 5px 5px 10px rgba(71, 71, 71, 0.2);
}
.accept-btn {
  background-color: #52a086;
  color: white;
  
}

.reject-btn {
  background-color: #f7f6f2;
  color: black;
}

#filterType{
  width: 11%; 
  padding: 8px; 
  border-radius: 4px; 
  border: 1px solid #ccc; 
  font-size: 14px;
  
}
</style>
