<template>
  <div>
    <button @click="toggleSidebar" class="notification-icon">
      <i class="fas fa-bell" style="font-size: 24px"></i>
      <span v-if="unreadNotifications > 0" class="notification-badge">{{
        unreadNotifications
      }}</span>
    </button>

    <button class="button" @click="addNotification">
      Add New Notification
    </button>
    
    <div class="sidebar" v-if="showSidebar" ref="sidebar">
      <i @click="closeSidebar" class="close-icon fas fa-times"></i>
      <div class="notification-content">
        <div v-if="notifications.length > 0" class="notification-list">
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="notification-item"
            :class="notification.variant"
          >
            <h5 class="alert-heading">{{ notification.title }}</h5>
            <p>{{ notification.text }}</p>
            <hr />
            <p class="mb-0 notification-footer">
              {{ getRelativeTime(notification.date) }}
            </p>
          </div>
        </div>
        <p v-else class="no-notifications-text">No notifications</p>
      </div>
    </div>
  </div>
</template>

<script>
import { HubConnectionBuilder } from "@microsoft/signalr";
import axios from "axios";
import { getUserIdFromToken } from "../authorization/authUserId";
// import io from "socket.io-client";

export default {
  data() {
    const userID = getUserIdFromToken();
    return {
      notifications: [],
      unreadNotifications: 0,
      showSidebar: true,
      connection: null, 
      userId: userID,
      loggedIn: false,
    };
  },
  mounted() {
    console.log("Component mounted");
    this.connectToSignalR();
  },
  beforeUnmount() {
    if (this.connection) {
      this.connection.stop();
    }

    if (this.loggedIn) {
      this.deregisterFromWebNotifications(this.userId);
    }
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
      if (this.showSidebar) {
        this.unreadNotifications = 0;
        this.markNotificationsAsRead();
        this.fetchUserNotifications(this.userId);
      }
    },
    closeSidebar() {
      this.showSidebar = false;
    },
    connectToSignalR() {
      this.connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5051/notificationHub")
        .withAutomaticReconnect()
        .build();

      this.connection
        .start()
        .then(() => {
          console.log("SignalR connected");
          this.registerForWebNotifications();
          this.connection.on("ReceiveNotification", (message) => {
            console.log("Received notification:", message);
            this.notifications.unshift(message);
            this.unreadNotifications++;
            this.clientReceiveNotification(message);
            
          });
        })
        .catch((error) => {
          console.error("SignalR connection error:", error);
        });
    },
    // addNotification() {
    //   const socket = io("ws://localhost:5051/notificationHub");

    //   socket.on("connect", () => {
    //     console.log("WebSocket connected");

    //     // Simulate sending an event to the server
    //     const eventData = {
    //       userId: this.userId,
    //       message: "Simulated WebSocket event data",
    //     };

    //     socket.emit("simulateEvent", eventData, (response) => {
    //       console.log("Server response:", response);
    //       socket.disconnect();
    //     });
    //   });

    //   socket.on("disconnect", () => {
    //     console.log("WebSocket disconnected");
    //   });
    // },
    registerForWebNotifications() {
      const parsedUserId = parseInt(this.userId);
      this.connection
        .invoke("RegisterForWebNotifications", parsedUserId)
        .then(() => {
          console.log("Successfully registered for web notifications.");
          this.loggedIn = true;
        })
        .catch((error) => {
          console.error("Failed to register for web notifications:", error);
        });
    },
    deregisterFromWebNotifications(userId) {
      const parsedUserId = parseInt(userId);
      this.connection
        .invoke("DeregisterFromWebNotifications", parsedUserId)
        .then(() => {
          console.log("Successfully deregistered from web notifications.");
          this.loggedIn = false;
        })
        .catch((error) => {
          console.error("Failed to deregister from web notifications:", error);
        });
    },
    fetchUserNotifications(userId) {
      axios
        .get(
          `http://localhost:5051/api/notifications/Notifications?userId=${userId}`
        )
        .then((response) => {
          this.notifications = response.data;
          console.log("Notificaitons: ",response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch user notifications:", error);
        });
    },
    markNotificationsAsRead() {
      // Logic to mark notifications as read (e.g., send API request to acknowledge notifications)
    },
    getRelativeTime(notificationDate) {
      const currentTime = new Date();
      const diffInSeconds = Math.floor(
        (currentTime - new Date(notificationDate)) / 1000
      );

      if (diffInSeconds < 60) {
        return "Just now";
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days !== 1 ? "s" : ""} ago`;
      }
    },
    clientReceiveNotification(data) {
      this.showNotificationBadge = true;
      this.$bvToast.toast(data.text, {
        title: data.title,
        autoHideDelay: 5000,
        variant: data.notificationEvent,
        appendToast: false,
      });
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

.notification-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}

.alert-heading {
  font-size: 16px;
  font-weight: bold;
}

.notification-footer {
  color: #999;
  font-size: 12px;
}

.no-notifications-text {
  font-size: 14px;
  color: #999;
  text-align: center;
  margin-top: 20px;
}
</style>
