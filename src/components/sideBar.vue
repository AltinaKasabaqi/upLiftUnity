<template>
  <div class="wrapper" :class="{ 'sidebar-open': isSidebarOpen }">
    <button class="hamburger" @click="toggleSidebar">
      <i
        class="fas"
        :class="{ 'fa-bars': !isSidebarOpen, 'fa-times': isSidebarOpen }"
      ></i>
    </button>
    <div class="sidebar">
      <div class="sidebar-content">
        <div class="profile-icon">
          <i class="fas fa-user-circle fa-3x"></i>
        </div>
        <ul class="sidebar-list">
          <li class="user-info">{{ user.name }} {{ user.surname }}</li>
          <li class="user-info">{{ user.email }}</li>
          <li class="user-role" v-if="user.roleId === 1">Administratorë</li>
          <li class="user-role" v-else-if="user.roleId === 2">Mbikqyrës</li>
          <li class="user-role" v-else-if="user.roleId === 3">Vullnetarë</li>
        </ul>
      
        <ul class="sidebar-list">
          <router-link  to="/callsHistory" class="sidebar-item"
            >Historiku i thirrjeve</router-link
          >
          <router-link v-if="user.roleId === 1" to="/statistics" class="sidebar-item"
            >Statistikat</router-link
          >
          <router-link v-if="user.roleId === 1" to="/allUsersView" class="sidebar-item"
            >Përdoruesit</router-link
          >
          <router-link v-if="user.roleId === 1" to="/register" class="sidebar-item"
            >Shto staf</router-link
          >
          <router-link v-if="user.roleId === 1" to="/RulesForma" class="sidebar-item"
            >Shto rregulla</router-link
          >
          <router-link to="/RulesDash" class="sidebar-item"
            >Rregullat e linjes</router-link
          >
          <router-link v-if="user.roleId === 1" to="/feedDash" class="sidebar-item"
            >Vleresimet</router-link
          >
          <router-link v-if="user.roleId === 1" to="/donations" class="sidebar-item"
            >Donacionet</router-link
          >
         
          <router-link to="/addNotes" class="sidebar-item">Shenime</router-link>
          <router-link to="/applications" class="sidebar-item"
          v-if="user.roleId === 1">Aplikimet</router-link
          >
          <router-link v-if="user.roleId === 1" to="/userActivities" class="sidebar-item"
            >Monitorimi i aktiviteteve</router-link
          >
          <router-link to="/mySchedule" class="sidebar-item"
          v-if=" user.roleId === 3 " >Orari i punës</router-link
          >
          <router-link to="/Calendar" class="sidebar-item"
          v-if="user.roleId === 1 || user.roleId === 2 || user.roleId === 3 " >Kalendari</router-link
          >

          <router-link to="/schedules" class="sidebar-item"
          v-if="user.roleId === 1 || user.roleId === 2" >Orari i vullnetareve</router-link
          >
        </ul>
        <ul class="sidebar-list">
          <router-link v-if="user.roleId === 1 "  to="/notifications" class="sidebar-item"
            >Lajmërime</router-link
          >
        </ul>
        <ul class="sidebar-list">
          <router-link to="/chat" class="sidebar-item">Chat</router-link>
        </ul>
        <ul class="sidebar-list">
          <button id="logoutButton" @click="showLogoutAlert">Çkyçu</button>
        </ul>
        <ul class="sidebar-list">
          <li class="settings" @click="goToSettingsPage">
            <i class="fas fa-key"></i>
            <span> Ndrysho fjalëkalimin</span>
          </li>
        </ul>
      </div>
     
      <div class="fixed-icons" v-if="!isSidebarOpen">
        <div  class="icon"><i class="fas fa-user"></i></div>
        <div v-if="user.roleId === 1" class="icon"><i class="fas fa-chart-bar"></i></div>
        <div v-if="user.roleId === 1" class="icon"><i class="fas fa-users"></i></div>
        <div v-if="user.roleId === 1" class="icon"><i class="fas fa-clipboard-list"></i></div>
        <div v-if="user.roleId === 1" class="icon"><i class="fas fa-user-plus"></i></div>
        <div v-if="user.roleId === 1" class="icon"><i class="fas fa-money-bill"></i></div>
        <div class="icon"><i class="fas fa-phone-alt"></i></div>
        <div class="icon"><i class="fas fa-pencil-alt"></i></div>
        <div v-if="user.roleId === 1 || user.roleId === 2" class="icon"><i class="fas fa-briefcase"></i></div>        
        <div  v-if="user.roleId === 1" class="icon"><i class="fas fa-eye"></i></div>
        <div  class="icon"><i class="fas fa-clock"></i></div>
        <div class="icon"><i class="fas fa-calendar-alt"></i></div>
        <div v-if="user.roleId === 1" class="icon" @click="goToNotificationsPage">
          <i class="activate-icon fas fa-bell"></i>
          <span v-if="unreadNotifications > 0" class="notification-badge">{{
            unreadNotifications
          }}</span>
        </div>
        <div class="icon"><i class="fas fa-comments"></i></div>     
        <div class="icon"><i class="fas fa-sign-out-alt"></i></div>
        <div class="icon"><i class="fas fa-cogs"></i></div>
      </div>
    </div>
    <div class="content">
      <router-view class="router-view-component"></router-view>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import VueJwtDecode from "vue-jwt-decode";
import Swal from "sweetalert2";

export default {
  name: "AdminDashboard",
  data() {
    return {
      isSidebarOpen: false,
      user: {},
      unreadNotifications: 0,
    };
  },
  created() {
    this.fetchPersonalData();
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    goToSettingsPage() {
      this.$router.push("/settings");
    },
    goToNotificationsPage() {
      window.location.href = "http://localhost:8080/#/notifications";
    },
    fetchPersonalData() {
      const token = Cookies.get("token");
      const decodedToken = VueJwtDecode.decode(token);
      const userId = decodedToken.nameid;
      fetch(`http://localhost:5051/api/users/GetUserByID/${userId}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.user = data;
        })

        .catch((error) => {
          console.error(
            "Gabim gjatë marrjes së të dhënave personale:",
            error.message
          );
        });
    },

    logout() {
      Cookies.remove("token");
      this.$router.push("/login");
    },
    showLogoutAlert() {
      Swal.fire({
        title: "Konfirmo",
        text: "Jeni i sigurt që dëshironi të çkyçeni?",
        icon: "warning",
        iconColor: "black",
        showCancelButton: true,
        confirmButtonColor: "rgba(54, 162, 235, 1)",
        cancelButtonColor: "rgba(255, 99, 132, 1)",
        confirmButtonText: "Po, çkyçu!",
        cancelButtonText: "Anulo",
      }).then((result) => {
        if (result.isConfirmed) {
          this.logout();
        }
      });
    },
  },
};
</script>

<style scoped>
.user-info {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5%;
}
.user-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.user-email {
  margin-bottom: 5px;
  text-decoration: underline;
}

.user-role {
  margin-bottom: 5px;
  font-style: italic;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5%;
}

.wrapper {
  display: flex;
}

.hamburger {
  display: block;
  position: fixed;
  top: 20px;
  background: none;
  border: none;
  color: #b8b8b8;
  font-size: 24px;
  cursor: pointer;
  z-index: 2;
}

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #2f4f4f;
  color: #fff;
  padding: 20px;
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  width: 250px;
  transition: transform 0.3s ease;
  z-index: 1;
  transform: translateX(-250px);
}

.fixed-icons {
  position: fixed;
  top: 20px;
  right: 1%;
  margin-top: 70px;
  font-size: 25px;
}

.icon {
  margin-bottom: 10px;
}

.icon i {
  font-size: 20px;
}
.notification-badge {
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: rgb(212, 37, 37);
  color: rgb(255, 255, 255);
  border-radius: 50%;
  padding: 3px;
  font-size: 12px;
}

.content {
  flex: 1;
  margin-left: 0;
  margin-top: 20px;
}

.sidebar-open .sidebar {
  transform: translateX(0);
}

.sidebar-open .fixed-icons {
  right: 270px;
}

.sidebar-heading {
  font-size: 18px;
  margin-top: 20px;
}

.sidebar-item {
  font-size: 16px;
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
  display: block;
  margin-bottom: 5px;
}

.sidebar-item:hover {
  color: #ccc;
}

.sidebar-list {
  list-style-type: none;
  padding-left: 0;
}

.profile-icon {
  text-align: center;
  margin-bottom: 20px;
}
#logoutButton {
  background-color: #ffffff;
  color: black;
  padding: 3%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 40%;
  font-weight: bold;
}

#logoutButton:hover {
  background-color: #beacac;
}
.settings {
  margin-top: 20%;
  cursor: pointer;
}
</style>
