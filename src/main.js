import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Define your routes here
    // Example:
    // { path: '/profile', component: ProfileComponent }
  ]
})

createApp(App).use(router).mount('#app')
