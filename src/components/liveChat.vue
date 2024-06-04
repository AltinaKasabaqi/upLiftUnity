<template>
  <div class="main">
    <section :class="['msger', { 'box-shadow': isChatOn }]">
      <header class="msger-header" @click="toggleChat">
        <div class="msger-header-title">
          <i class="fas fa-comment-alt"></i> {{ recipient ? recipientName : 'Live Chat' }}
        </div>
        <div class="msger-header-options">
          <span><i class="fas fa-cog"></i></span>
        </div>
      </header>

      <main v-show="isChatOn" class="msger-chat" ref="chat">
        <div v-for="(message, index) in messages" :key="index" :class="{'msg right-msg': message.position === 'right', 'msg left-msg': message.position === 'left'}">
          <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">{{ message.senderEmail === email ? 'You' : getUserName(message.senderEmail) }}</div>
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
          <i class="fas fa-users"></i> 
          <span v-if="this.role === 'Volunteer'"><b>Mbikqyrësit & Administratorë</b></span>
          <span v-else-if="this.role === 'SuperVisor'"><b>Vullnetarët & Administratorë</b></span>
          <span v-else>Users</span>
        </div>
      </header>
      <div class="user-list">
        <div v-for="(user, index) in users" :key="index" class="user" @click="changeRecipient(user.email)">
          <span class="user-name">{{ user.name }} {{ user.surname }}</span>
          <span v-if="user.newMessagesCount > 0" class="notification-badge">{{ user.newMessagesCount }}</span>
          <span class="hidden-email" :data-email="user.email"></span>
        </div>
      </div>
    </section>
  </div>
  <aiPrompt></aiPrompt>
</template>

<script>
import * as signalR from "@microsoft/signalr";
import axios from '../api/axios.js';
import { getUserEmailFromToken } from "@/authorization/userEmail.js";
import { geRoleFromToken } from "@/authorization/authRoleId.js";
import aiPrompt from "./aiPrompt.vue";

export default {
  components:{
    aiPrompt
  },
  data() {
    return {
      messages: [],
      newMessage: '',
      recipient: '',
      recipientName: '',
      connection: null,
      users: [],
      email: '',
      isChatOn: false,
      role:'',
      showNotification: false,
    };
  },
  mounted() {
    this.email = getUserEmailFromToken();
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:5051/chat?email=${this.email}`)
      .build();

    this.connection.on("broadcastMessage", (user, newMessage) => {
      console.log(`Message received from ${user}: ${newMessage}`);
      this.handleNewMessage(user, newMessage);
    });

    this.connection.start().catch(err => console.error(err.toString()));
    this.fetchUsers();
  },
  methods: {
    scrollToBottom() {
      this.$nextTick(() => {
        const chatContainer = this.$refs.chat;
        chatContainer.scrollTop = chatContainer.scrollHeight;
      });
    },
    handleNewMessage(user, newMessage) {
      if (user !== this.email) {
        const recipientUser = this.users.find(u => u.email === user);
        if (recipientUser) {
          recipientUser.newMessagesCount++;
        }
      }
      this.messages.push({
        position: user === this.email ? 'right' : 'left',
        senderEmail: user,
        time: new Date().toLocaleTimeString(),
        text: newMessage
      });
      this.scrollToBottom();
    },
    sendMessage() {
      if (this.newMessage.trim() === '') return;
      if (this.recipient.trim() === '') {
        alert("Please specify a recipient.");
        return;
      }
      const email = this.email;
      let selectedUser = this.users.find(user => user.email === this.recipient.trim());
      if (!selectedUser) {
        alert("Recipient not found.");
        return;
      }

      this.messages.push({
        position: 'right',
        senderEmail: email,
        time: new Date().toLocaleTimeString(),
        text: this.newMessage.trim()
      });

      this.connection.invoke("SendToSpecific", email, this.newMessage.trim(), this.recipient.trim())
        .catch(err => console.error(err.toString()));
      this.newMessage = '';
      this.scrollToBottom();
    },
    changeRecipient(email) {
      this.recipient = email;
      const selectedUser = this.users.find(user => user.email === email);
      if (selectedUser) {
        this.recipientName = `${selectedUser.name} ${selectedUser.surname}`;
        selectedUser.newMessagesCount = 0;
      }
      this.isChatOn = true; 
      this.fetchConversationHistory(this.email, email);
    },
    fetchUsers() {
      this.role = geRoleFromToken();
      console.log('Role from token:', this.role);

      const normalizedRole = this.role.toLowerCase();
      const email = this.email;

      axios.get('http://localhost:5051/api/users/GetUsers')
        .then(response => {
          let allUsers = response.data.filter(user => user.email !== email).map(user => ({
            ...user,
            newMessagesCount: 0
          }));

          if (normalizedRole === 'superadmin') {
            this.users = allUsers;
          } else if (normalizedRole === 'supervisor') {
            this.users = allUsers.filter(user => user.roleId === 1 || user.roleId === 3);
          } else if (normalizedRole === 'volunteer') {
            this.users = allUsers.filter(user => user.roleId === 1 || user.roleId === 2);
          } else {
            console.error('Unexpected role:', this.role);
          }
          this.users.sort((a, b) => {
            if (a.roleId === 1 && b.roleId !== 1) return -1;
            if (a.roleId !== 1 && b.roleId === 1) return 1;
            return 0;
          });
          console.log('Fetched users:', this.users);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchConversationHistory(myEmail, otherEmail) {
      axios.get(`http://localhost:5051/api/Chat/conversation?user1=${myEmail}&user2=${otherEmail}`)
        .then(response => {
          this.messages = response.data.map(message => ({
            position: message.sender === myEmail ? 'right' : 'left',
            senderEmail: message.sender,
            time: new Date(message.createdAt).toLocaleTimeString(),
            text: message.content
          }));
          console.log(response.data);
          this.scrollToBottom();
        })
        .catch(error => {
          console.error('Error fetching conversation history:', error);
        });
    },
    getUserName(email) {
      const user = this.users.find(user => user.email === email);
      return user ? `${user.name} ${user.surname}` : email;
    }
  }
};
</script>

<style scoped>
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
.user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  position: relative;
}

.user-email {
  flex-grow: 1;
}

.notification-badge {
  background-color: #ff4136;
  color: #fff;
  font-size: 0.8em;
  padding: 5px 8px;
  border-radius: 50%;
  margin-left: 10px;
}


</style>
