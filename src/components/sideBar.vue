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
        <h3 class="sidebar-heading">Profili</h3>
        <p class="sidebar-item">Emri</p>
        <p class="sidebar-item">Llogaria e Përdoruesit</p>
        <p class="sidebar-item">Lajmërime</p>

        <h3 class="sidebar-heading">Paneli i Administratorit</h3>
        <ul class="sidebar-list">
          <li class="sidebar-item">Faqja Kryesore</li>
          <li class="sidebar-item">Përdoruesit</li>
          <li class="sidebar-item">Pagesat</li>
          <li class="sidebar-item">Analiza</li>
        </ul>

        <h3 class="sidebar-heading">Komente dhe Sygjerime</h3>
        <p class="sidebar-item">Komente</p>
        <p class="sidebar-item">Sygjerime</p>

        <h3 class="sidebar-heading">Ndihmë dhe mbështetje</h3>
        <p class="sidebar-item">Manual përdorimi</p>
        <p class="sidebar-item">Bisedë në kohë reale</p>

        <ul class="sidebar-list">
          <li class="sidebar-item">Çkyqu</li>
        </ul>
      </div>
      <div class="fixed-icons" v-if="!isSidebarOpen">
        <!-- Icons -->
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
      <!-- Dashboard content goes here -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      isSidebarOpen: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
}
</script>

<style scoped>
/* Styles for sidebar and icons */
.wrapper {
  display: flex;
  /* min-height: 100vh; */
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
  background-color: #283d3d;
  color: #fff;
  padding: 20px;
  text-align: left;
  font-family: Georgia, 'Times New Roman', Times, serif;
  width: 250px;
  overflow-y: auto;
  transition: transform 0.3s ease;
  z-index: 1;
  transform: translateX(-250px);
}



.fixed-icons {
  position: fixed;
  top: 20px; /* Adjust vertical positioning */
  right: 10px; /* Adjust horizontal positioning */
  margin-top: 70px;
  font-size: 25px;
}

.icon {
  margin-bottom: 10px;
}

.icon i {
  font-size: 18px; /* Adjust icon size */
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
  right: 270px; /* Adjust to accommodate open sidebar */
}

/* Custom styles for sidebar items */
.sidebar-heading {
  font-size: 18px;
  margin-top: 20px;
}

.sidebar-item {
  font-size: 16px;
}

.sidebar-list {
  list-style-type: none;
  padding-left: 0;
}

.profile-icon {
  text-align: center;
  margin-bottom: 20px;
}
</style>
