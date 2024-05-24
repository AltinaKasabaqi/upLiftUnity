<template>
  <div class="main">
    <section :class="['msger', { 'box-shadow': isChatOn }]">
      <header class="msger-header" @click="toggleChat">
        <div class="msger-header-title">
          <i class="fas fa-comment-alt"></i> {{ recipient ? recipient : 'Live Chat' }}
        </div>
        <div class="msger-header-options">
          <span><i class="fas fa-cog"></i></span>
        </div>
      </header>

      <main v-show="isChatOn" class="msger-chat" ref="chat">
        <div v-for="(message, index) in messages" :key="index" :class="{'msg right-msg': message.position === 'right', 'msg left-msg': message.position === 'left'}">
          <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">{{ message.name == this.email ? 'You' : message.name }}</div>
              <div class="msg-info-time">{{ message.time }}</div>
            </div>
            <div class="msg-text">{{ message.text }}</div>
          </div>
        </div>
      </main>

      <form v-show="isChatOn" class="msger-inputarea" @submit.prevent="sendMessage">
        <input type="text" class="msger-input" placeholder="Enter your message..." v-model="newMessage" />
        <button type="submit" class="msger-send-btn">Send</button>
      </form>
    </section>

    <section class="user-sidebar">
      <header class="user-sidebar-header">
        <div class="user-sidebar-title">
          <i class="fas fa-users"></i> Users
        </div>
      </header>
      <div class="user-list">
        <div v-for="(user, index) in users" :key="index" class="user" @click="changeRecipient(user.email)">
          {{ user.email }}
        </div>
      </div>
    </section>
  </div>
</template>



<script>
import * as signalR from "@microsoft/signalr";
import axios from '../api/axios.js';
import { getUserEmailFromToken } from "@/authorization/userEmail.js";

export default {
  data() {
    return {
      messages: [],
      newMessage: '',
      recipient: '',
      connection: null,
      users: [],
      email: '',
      isChatOn: false, // State to manage chat toggle
    };
  },
  mounted() {
    this.email = getUserEmailFromToken();
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:5051/chat?email=${this.email}`)
      .build();

    this.connection.on("broadcastMessage", (user, newMessage) => {
      console.log("Message received from ${user} ${newMessage}");

      this.messages.push({
        position: user === this.email ? 'right' : 'left',
        name: user,
        time: new Date().toLocaleTimeString(),
        text: newMessage
      });
    });

    this.connection.start()
      .catch(err => console.error(err.toString()));
    
    this.fetchUsers();
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() === '') return;
      if (this.recipient.trim() === '') {
        alert("Please specify a recipient.");
        return;
      }
      const email = getUserEmailFromToken();
      let selectedUser = this.users.find(user => user.email === this.recipient.trim());
      if (!selectedUser) {
        alert("Recipient not found.");
        return;
      }

      this.messages.push({
        position: 'right',
        name: email,
        time: new Date().toLocaleTimeString(),
        text: this.newMessage.trim()
      });

      this.connection.invoke("SendToSpecific", email, this.newMessage.trim(), this.recipient.trim())
        .catch(err => console.error(err.toString()));

      this.newMessage = '';
    },
    changeRecipient(email) {
      this.recipient = email;
      this.isChatOn = true; 
      this.fetchConversationHistory(this.email,email); 
      console.log('emails' + this.email + email);
    },
    fetchUsers() {
      const email = getUserEmailFromToken();
      axios.get(`http://localhost:5051/api/users/GetUsersByRoleId?roleId=2`)
        .then(response => {
          this.users = response.data.filter(user => user.email !== email);
          console.log(this.users);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchConversationHistory(myEmail,otherEmail) {
      axios.get(`http://localhost:5051/api/Chat/conversation?senderEmail=${myEmail}&receiverEmail=${otherEmail}`)
 
        .then(response => {
          this.messages = response.data.map(message => ({
            position: message.conversation.senderEmail === myEmail ? 'right' : 'left',
            name: message.conversation.senderEmail,
            time: new Date(message.createdAt).toLocaleTimeString(),
            text: message.content
          }));
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error fetching conversation history:', error);
        });
    }
  }
};
</script>



<style>
.main {
  display: flex;
  height: 100vh;
  background: var(--body-bg);
}

.msger {
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: flex-end; /* Ensure the header stays at the bottom */
  margin-left: 20%;
  padding-right: 2%;
  height: calc(100% - 50px);
  border: var(--border);
  border-radius: 5px;
  background: var(--msger-bg);
}

.box-shadow {
  box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.3); /* Apply box shadow only when chat is on */
}

.msger-header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: var(--border);
  background: #eee;
  color: #666;
}

.user-sidebar {
  width: 30%;
  height: calc(100% - 50px);
  border: var(--border);
  border-radius: 5px;
  background: var(--msger-bg);
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.2);
}

.user-sidebar-header {
  padding: 10px;
  border-bottom: var(--border);
  background: #eee;
  color: #666;
}

.user-sidebar-title {
  display: flex;
  align-items: center;
}

.user-sidebar-title i {
  margin-right: 5px;
}

.user-list {
  padding: 10px;
  overflow-y: auto;
  height: calc(100% - 50px);
  cursor: pointer;
}

.user {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.msger-chat {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.msger-chat::-webkit-scrollbar {
  width: 6px;
}

.msger-chat::-webkit-scrollbar-track {
  background: #ddd;
}

.msger-chat::-webkit-scrollbar-thumb {
  background: #bdbdbd;
}

.msg {
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
}

.msg:last-of-type {
  margin: 0;
}

.msg-bubble {
  max-width: 450px;
  padding: 15px;
  border-radius: 15px;
  background: var(--left-msg-bg);
}

.msg-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  color: black;
}

.msg-info-name {
  margin-right: 10px;
  font-weight: bold;
}

.msg-info-time {
  font-size: 0.85em;
}

.left-msg .msg-bubble {
  border-bottom-left-radius: 0;
  background-color: #e5f1e7;
}

.right-msg {
  flex-direction: row-reverse;
}

.right-msg .msg-bubble {
  background: var(--right-msg-bg);
  color: black;
  background-color: #eee;
  border-bottom-right-radius: 0;
}

.right-msg .msg-img {
  margin: 0 0 0 10px;
}

.msger-inputarea {
  display: flex;
  padding: 10px;
  border-top: var(--border);
  background: #eee;
}

.msger-inputarea * {
  padding: 10px;
  border: none;
  border-radius: 3px;
  font-size: 1em;
}

.msger-input {
  flex: 1;
  background: #ddd;
}

.msger-send-btn {
  margin-left: 10px;
  background: #52A086;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  width: 15%;
  transition: background 0.23s;
}

.msger-send-btn:hover {
  background: #B8DDBE;
}

.msger-chat {
  background-color: #fcfcfe;
}
</style>
