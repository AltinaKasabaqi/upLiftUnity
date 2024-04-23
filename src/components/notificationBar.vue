<template>
    <div class="notification-bar">
      <button @click="toggleSidebar" class="notification-icon">
        <i class="fas fa-bell" style="font-size: 24px;"></i>
        <span v-if="unreadNotifications > 0" class="notification-badge">{{ unreadNotifications }}</span>
      </button>
      <div class="sidebar" v-if="showSidebar" ref="sidebar">
        <i @click="closeSidebar" class="close-icon fas fa-times"></i>
        <div class="notification-content">
          {{ notificationContent }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        unreadNotifications: 3,
        showSidebar: false,
        notificationContent: '' 
      };
    },
    methods: {
      toggleSidebar() {
        this.showSidebar = !this.showSidebar;
        if (this.showSidebar) {
          this.generateContent();
        }
      },
      generateContent() {
        this.notificationContent = "Example notification content...";
      },
      closeSidebar() {
        this.showSidebar = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .notification-bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #f2f2f2;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .notification-icon {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
  }
  
  .notification-badge {
    position: absolute;
    top: -9px;
    right: -11px;
    background-color: rgb(212, 37, 37);
    color: rgb(255, 255, 255);
    border-radius: 100%;
    padding: 3px;
    font-size: 12px;
  }
  
  .sidebar {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 300px; 
    background-color: #fff;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }
  
  .notification-content {
    padding: 20px;
  }
  
  .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: #999;
  }
  
  .close-icon:hover {
    color: #666;
  }
  </style>
  