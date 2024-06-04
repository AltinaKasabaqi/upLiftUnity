<template>
  <div class="notification-item" :class="notification.variant" @click="markAsRead">
    <h5 class="alert-heading">{{ notification.title }}</h5>
    <p>{{ notification.text }}</p>
    <hr />
    <p class="mb-0 notification-footer">{{ getRelativeTime(notification.createdOnUtc) }}</p>
  </div>
</template>
  <script>
  export default {
    props: {
      notification: {
        type: Object,
        required: true,
      },
    },
    methods: {
      getRelativeTime(notificationDate) {
        const currentTime = new Date();
        const diffInSeconds = Math.floor((currentTime - new Date(notificationDate)) / 1000);
  
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
       markAsRead() {
      this.$emit('markAsRead', this.notification);
    }
    },
  };
  </script>
  
  <style scoped>
.notification-item {
  border: 2px solid #ccc;
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
</style>