<template>
  <div class="ai-input">
    <div v-if="response" :class="responseClass">{{ response }}</div>
    <label for="aiPrompt">AI:</label>
    <input
      type="text"
      id="aiPrompt"
      v-model="prompt"
      @keyup.enter="submitPrompt"
      placeholder="Pyet Intelegjencen Artificiale"
    />
    <button @click="submitPrompt">Dërgo</button>   
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      prompt: '',
      response: ''  // Për të mbajtur përgjigjen e AI-së
    };
  },
  computed: {
    responseClass() {
      return this.response ? 'ai-response ai-response-active' : 'ai-response';
    }
  },
  methods: {
    async submitPrompt() {
      if (this.prompt.trim() !== '') {
        try {
          const result = await axios.post('http://localhost:5051/api/Ai', {
            searchText: this.prompt
          });
          this.response = result.data;
        } catch (error) {
          this.response = 'AI nuk eshte i qasshem per momentin';
          console.error(error);
        } finally {
          this.prompt = '';  // Pasi të dërgohet pyetja, pastrohet fusha e inputit
        }
      }
    }
  }
};
</script>

<style scoped>
.ai-input {
  display: inline;
  flex-direction: column;
  align-items: center;
  max-width: 15%;
  width: 100%;
  float: left;
  margin-top: -11%;
  margin-left: 3%;
}

#aiPrompt {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 110%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #52A086;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #B8DDBE;
}

.ai-response {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
}

.ai-response-active {
  margin-top: -25%;
  margin-left: 3%;
}
</style>
