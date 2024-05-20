<template>
    <div class="sidebar">
      <i @click="$emit('close')" class="close-icon fas fa-times"></i>
      <div class="notification-content">
        <div v-if="notifications.length > 0" class="notification-list">
          <NotificationItem v-for="notification in notifications" :key="notification.id" :notification="notification" />
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
  /* Add styles here */
  </style>
  