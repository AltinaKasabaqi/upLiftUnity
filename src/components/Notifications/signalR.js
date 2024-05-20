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
      connection.on("SendNotificationToClient", (notification) => { 
        onReceiveNotification(notification);
      });
      connection.on("SendWelcomeMessageToNewClients", onWelcomeMessage)
    })
    .catch((error) => {
      console.error("SignalR connection error:", error);
    });

  return connection;
}

function onWelcomeMessage(notification){
  console.log("Message:", notification)
}

export async function disconnectFromSignalR(connection, userId) {
  if (connection) {
    try {
      await deregisterFromWebNotifications(connection, userId);
    } catch (error) {
      console.error("Error during deregistration:", error);
    }

    connection.stop()
      .then(() => {
        console.log("SignalR disconnected");
      })
      .catch((error) => {
        console.error("Error during disconnection:", error);
      });
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

async function deregisterFromWebNotifications(connection, userId) {
  try {
    await connection.invoke("DeregisterFromWebNotifications", parseInt(userId));
    console.log("Successfully deregistered from web notifications.");
  } catch (error) {
    console.error("Failed to deregister from web notifications:", error);
    throw error;
  }
}

