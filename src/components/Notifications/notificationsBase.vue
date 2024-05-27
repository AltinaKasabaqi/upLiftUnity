<template>
  <div>
    <div class="notification-container">
      <div class="notification-content">
        <i
          v-if="unreadNotifications > 0"
          class="fas fa-bell new-notification-icon"
        ></i>
        <div class="notification-list" v-if="notifications.length > 0">
          <NotificationItem
            v-for="notification in notifications"
            :key="notification.id"
            :notification="notification"
            @click="notificationClick(notification)"
            :class="{ 'new-notification': isNewNotification(notification) }"
          />
        </div>
        <p v-else class="no-notifications-text">No notifications</p>
      </div>
    </div>
  </div>
</template>

<script>
import { connectToSignalR, disconnectFromSignalR } from "./signalR.js";
import { fetchUserNotifications, fetchAllNotifications } from "./api.js";
import { getUserIdFromToken } from "../../authorization/authUserId.js";
import { geRoleFromToken } from "../../authorization/authRoleId.js";
// import NotificationList from "./notificationList.vue";
import NotificationItem from "./notificationItem.vue";

export default {
  components: {
    NotificationItem,
  },
  data() {
    return {
      notifications: [],
      unreadNotifications: 0,
      connection: null,
      userId: getUserIdFromToken(),
      roleName: geRoleFromToken(),
    };
  },
  mounted() {
    this.connection = connectToSignalR(
      this.userId,
      this.roleName,
      this.receiveNotification
    );
    this.fetchNotifications();
  },

  beforeUnmount() {
    disconnectFromSignalR(this.connection, this.userId, this.roleName);
  },

  methods: {
    fetchNotifications() {
      fetchAllNotifications().then((notifications) => {
        this.notifications = notifications;
        console.log("Fetched notifications: ", notifications);
      });
    },
    showNotifications() {
      this.unreadNotifications = 0;
      fetchUserNotifications(this.userId).then((notifications) => {
        this.notifications = notifications;
        console.log("Fetched notifications: ", notifications);
      });
    },
    receiveNotification(notification) {
      console.log("A notification has been received!");
      this.notifications.unshift(notification);
      this.unreadNotifications++;
      console.log("Received notification: ", notification);
    },
    notificationClick(notification) {
      console.log("Notification clicked:", notification);
    },
    isNewNotification(notification) {
     //The notifications that are 5 mins old are the new notifications!!!
      const notificationDate = new Date(notification.createdOnUtc)
      const currentTime = new Date();
      const timeDiff = Math.abs(currentTime - notificationDate);
      const diffMinutes = Math.ceil(timeDiff / (1000 * 60)); 
      return diffMinutes <= 5;
    },
    connectToSignalR() {
      this.connection = connectToSignalR(
        this.userId,
        this.roleName,
        (notification) => {
          this.notifications.unshift(notification);
          if (!notification.isRead && !this.showSidebar) {
            this.unreadNotifications++;
          }
          console.log("Received notification: ", notification);
        }
      );
    },
    disconnectFromSignalR() {
      disconnectFromSignalR(this.connection, this.userId, this.roleName);
    },
  },
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  max-height: 600px; 
  background-color: #fff;
  box-shadow: 0 5px 5px 5px rgba(0, 0, 0, 0.1);
  z-index: 999;
  overflow-y: auto;
}

.notification-content {
  padding: 20px;
}

.new-notification-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  color: #5cb85c;
  font-size: 24px;
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

.new-notification {
  border: 2px solid #5cb85c;
  border-radius: 5px;
  padding: 10px;
}
</style>