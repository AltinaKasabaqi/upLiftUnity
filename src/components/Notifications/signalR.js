import { HubConnectionBuilder } from "@microsoft/signalr";

export function connectToSignalR(userId, onReceiveNotification) {
  const connection = new HubConnectionBuilder()
    .withUrl("http://localhost:5051/notificationHub")
    .withAutomaticReconnect()
    .build();

  connection.start()
    .then(() => {
      console.log("SignalR connected");
      registerForWebNotifications(connection, userId);
      connection.on("ReceiveNotification", onReceiveNotification);
    })
    .catch((error) => {
      console.error("SignalR connection error:", error);
    });

  return connection;
}

export function disconnectFromSignalR(connection, userId) {
  if (connection) {
    deregisterFromWebNotifications(connection, userId);
    connection.stop();
  }
}

function registerForWebNotifications(connection, userId) {
  connection.invoke("RegisterForWebNotifications", parseInt(userId))
    .then(() => {
      console.log("Successfully registered for web notifications.");
    })
    .catch((error) => {
      console.error("Failed to register for web notifications:", error);
    });
}

function deregisterFromWebNotifications(connection, userId) {
  connection.invoke("DeregisterFromWebNotifications", parseInt(userId))
    .then(() => {
      console.log("Successfully deregistered from web notifications.");
    })
    .catch((error) => {
      console.error("Failed to deregister from web notifications:", error);
    });
}
