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
