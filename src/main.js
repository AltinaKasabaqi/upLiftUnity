import { createApp } from "vue";
import App from "./App.vue";
import VueCookies from 'vue-cookies'; // Importoni plugin-in për cookies

import router from "./router"; // Importoni router-in
import authorizeMiddleware from './authorization/auth.js'; // Importoni middleware për autorizim

// Përdorimi i VueCookies plugin-it
const app = createApp(App);
app.use(VueCookies, {
    expireTimes: "7d" // Vendosni shkëputjen kohore për cookies
  });// Përfshini VueCookies në aplikacion

// Përdorimi i router-it
app.use(router);

// Shtimi i middleware për autorizim në router
router.beforeEach(authorizeMiddleware);

// Instalimi i aplikacionit
app.mount("#app");
