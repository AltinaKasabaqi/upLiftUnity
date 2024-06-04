<template>
    <div id="div">
      <h1>Notes Chat</h1>
      <NotesChat />
    </div>
  </template>
  
  <script>
  import NotesChat from './addNotesForm.vue';
  
  export default {
    name: 'App',
    components: {
      NotesChat
    }
  };
  </script>
  
  <style scoped>
  #div {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  </style>
  