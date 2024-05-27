import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import authorizeMiddleware from './authorization/auth.js'; 


const app = createApp(App);
app.use(router);
router.beforeEach(authorizeMiddleware);
app.mount("#app");