<template>
  <div>
    <button @click="toggleSidebar" class="notification-icon">
      <i class="fas fa-bell" style="font-size: 24px"></i>
      <span v-if="unreadNotifications > 0" class="notification-badge">{{
        unreadNotifications
      }}</span>
    </button>
    <NotificationList
      v-if="showSidebar"
      :notifications="notifications"
      @close="closeSidebar"
    />
  </div>
</template>

<script>
import { connectToSignalR, disconnectFromSignalR } from "./signalR.js";
import { fetchUserNotifications } from "./api.js";
import { getUserIdFromToken } from "../../authorization/authUserId.js";
import { geRoleFromToken  } from '../../authorization/authRoleId.js'
import NotificationList from "./notificationList.vue";

export default {
  components: {
    NotificationList,
  },
  data() {
    return {
      notifications: [],
      unreadNotifications: 0,
      showSidebar: true,
      connection: null,
      userId: getUserIdFromToken(),
      roleName: geRoleFromToken(),
    };
  },
  mounted() {
    this.connection = connectToSignalR(this.userId, this.roleName, this.receiveNotification);
  },

  beforeUnmount() {
    disconnectFromSignalR(this.connection, this.userId);
  },

  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
      if (this.showSidebar) {
        this.unreadNotifications = 0;
        fetchUserNotifications(this.userId).then((notifications) => {
          this.notifications = notifications;
          console.log("Fetched notifications: ", notifications);
        });
      }
    },
    closeSidebar() {
      this.showSidebar = false;
    },
    receiveNotification(notification) {
      console.log(" A notification has been received!")
      this.notifications.unshift(notification);
      if (!this.showSidebar) {
        this.unreadNotifications++;
      }
      console.log("Received notification: ", notification);
    },

    connectToSignalR() {
      this.connection = connectToSignalR(this.userId, this.roleName, (notification) => {
        this.notifications.unshift(notification);
        this.unreadNotifications++;
        console.log("Received notification: ", notification);
      });
    },
    disconnectFromSignalR() {
      disconnectFromSignalR(this.connection, this.userId);
    },
  },
};
</script>

<style scoped>
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
  border-radius: 50%;
  padding: 3px;
  font-size: 12px;
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 300px;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 999;
  overflow-y: auto;
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

.notification-list {
  display: flex;
  flex-direction: column;
}

.no-notifications-text {
  font-size: 14px;
  color: #999;
  text-align: center;
  margin-top: 20px;
}
</style>
