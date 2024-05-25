import axios from "axios";

export function fetchUserNotifications(userId) {
  return axios.get(`http://localhost:5051/api/notifications/Notifications?userId=${userId}`)
    .then(response => {

      console.log({hi:response})

      return response.data;
    })
    .catch(error => {
      console.error("Failed to fetch user notifications:", error);
      throw error;
    });
}

 export function updateReadStatus(notificationId, isRead) {
  return axios.post('http://localhost:5051/notifications/updateReadStatus', {
    notificationId: notificationId,
    isRead: isRead
  })
  .then(response => {
    console.log("Read status updated successfully",response);
  })
  .catch(error => {
    console.error("Failed to update read status:", error);
  });
}

