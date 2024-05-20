<!-- <template>
  <div>
    <div v-for="message in messages" :key="message.id">
      <strong>{{ message.user }}:</strong> {{ message.content }}
    </div>
    <input v-model="email" placeholder="Your name"/>
    <input v-model="newMessage" placeholder="Your message"/>
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
import * as signalR from "@microsoft/signalr";

export default {
  data() {
    return {
      email: '',
      newMessage: '',
      messages: [],
      connection: null,
      chatRoom: 'SpecificationChatRoom' // Assuming a fixed chat room for simplicity
    };
  },
  mounted() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5051/chat")
      .build();

    this.connection.on("ReceiveMessage", (email, message) => {
      this.messages.push({ user: email, content: message });
    });

    this.connection.start()
      .then(() => {
        console.log("SignalR connection established.");
      })
      .catch(err => console.error(err.toString()));
  },
  methods: {
    async sendMessage() {
      if (this.email && this.newMessage) {
        const connectionInfo = {
          email: this.email,
          message: this.newMessage,
          chatRoom: this.chatRoom
        };
        
        try {
          await this.connection.invoke("JoinSpecificationChatRoom", connectionInfo);
          this.newMessage = '';
        } catch (err) {
          console.error(err.toString());
        }
      }
    }
  }
};
</script>

<style>
/* Add your styles here */
</style> -->
