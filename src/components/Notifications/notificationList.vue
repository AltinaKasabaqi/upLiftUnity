<template>
    <div class="sidebar">
      <i @click="$emit('close')" class="close-icon fas fa-times"></i>
      <div class="notification-content">
        <div v-if="notifications.length > 0" class="notification-list">
          <NotificationItem v-for="notification in notifications" :key="notification" :notification="notification" />
        </div>
        <p v-else class="no-notifications-text">No notifications</p>
      </div>
    </div>
  </template>
  
  <script>
  import NotificationItem from "./notificationItem.vue";
  
  export default {
    props: {
      notifications: {
        type: Array,
        required: true,
      },
    },
    components: {
      NotificationItem,
    },
  };
  </script>
  
  <style scoped>
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
  