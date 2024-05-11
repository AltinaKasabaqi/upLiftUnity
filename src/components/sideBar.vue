<template>
  <div class="wrapper" :class="{ 'sidebar-open': isSidebarOpen }">
    <button class="hamburger" @click="toggleSidebar">
      <i class="fas" :class="{'fa-bars': !isSidebarOpen, 'fa-times': isSidebarOpen}"></i>
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
        <h3 class="sidebar-heading">Paneli i Administratorit</h3>
        <ul class="sidebar-list">
          <router-link to="/statistics" class="sidebar-item">Statistikat</router-link>
          <router-link to="/allUsersView" class="sidebar-item">Përdoruesit</router-link>
          <router-link to="/register" class="sidebar-item">Shto staf</router-link>
          <router-link to="/donations" class="sidebar-item">Donacionet</router-link>
          <router-link to="/callsHistory" class="sidebar-item">Historiku i thirrjeve</router-link>
          <router-link to="/myNotes" class="sidebar-item">Shënimet personale</router-link>
          <router-link to="/applications" class="sidebar-item">Aplikimet</router-link>
          <router-link to="/userActivities" class="sidebar-item">Monitorimi i aktiviteteve</router-link>
          <router-link to="/mySchedule" class="sidebar-item">Orari i punës</router-link>
          <router-link to="/Calendar" class="sidebar-item">Kalendari</router-link>
        </ul>
        <h3 class="sidebar-heading">Shërbimet e tjera</h3>
        <ul class="sidebar-list">
          <router-link to="/chat" class="sidebar-item">Chat</router-link>
        </ul>
        <ul class="sidebar-list">
          <button id="logoutButton" @click="showLogoutAlert">Çkyçu</button>
        </ul>
      </div>
      <div class="fixed-icons" v-if="!isSidebarOpen">
        <div class="icon"><i class="fas fa-user"></i></div>
        <div class="icon"><i class="fas fa-bell"></i></div>
        <div class="icon"><i class="fas fa-cogs"></i></div>
        <div class="icon"><i class="fas fa-home"></i></div>
        <div class="icon"><i class="fas fa-users"></i></div>
        <div class="icon"><i class="fas fa-money-bill"></i></div>
        <div class="icon"><i class="fas fa-chart-bar"></i></div>
        <div class="icon"><i class="fas fa-comments"></i></div>
        <div class="icon"><i class="fas fa-comment"></i></div>
        <div class="icon"><i class="fas fa-lightbulb"></i></div>
        <div class="icon"><i class="fas fa-question-circle"></i></div>
        <div class="icon"><i class="fas fa-book"></i></div>
        <div class="icon"><i class="fas fa-sign-out-alt"></i></div>
      </div>
    </div>
    <div class="content">
  <router-view class="router-view-component"></router-view>
</div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import VueJwtDecode from 'vue-jwt-decode';
import Swal from 'sweetalert2';


export default {
  
  name: 'AdminDashboard',
  data() {
    
    return {
      isSidebarOpen: false,
      user: {},
    };
  },
  created() {
    this.fetchPersonalData();
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  
    fetchPersonalData(){
      const token = Cookies.get('token');
      const decodedToken = VueJwtDecode.decode(token);
      const userId= decodedToken.nameid;
      fetch(`http://localhost:5051/api/users/GetUserByID/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token 
      }
    })
    .then(response => response.json())
    .then(data => {
        this.user = data; 
    })
  
     
    .catch(error => {
      console.error('Gabim gjatë marrjes së të dhënave personale:', error.message);
    });
  },
  
    logout() {
      Cookies.remove('token');
      this.$router.push('/login');
    },showLogoutAlert() {
    Swal.fire({
      title: 'Konfirmo',
      text: 'Jeni i sigurt që dëshironi të çkyçeni?',
      icon: 'warning',
      iconColor:'black',
      showCancelButton: true,
      confirmButtonColor: 'rgba(54, 162, 235, 1)',
      cancelButtonColor: 'rgba(255, 99, 132, 1)',
      confirmButtonText: 'Po, çkyçu!',
      cancelButtonText: 'Anulo'
   
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout(); 
      }
    })
  },
  



    
  }
}
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
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  z-index: 2;
}

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: 	#2F4F4F;
  color: #fff;
  padding: 20px;
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  width: 250px;
  overflow-y: auto;
  transition: transform 0.3s ease;
  z-index: 1;
  transform: translateX(-250px);
}

.fixed-icons {
  position: fixed;
  top: 20px; 
  right: 10px;
  margin-top: 70px;
  font-size: 25px;
}

.icon {
  margin-bottom: 10px;
}

.icon i {
  font-size: 18px;
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




</style>
