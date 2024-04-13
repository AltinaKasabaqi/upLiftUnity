
import { createRouter, createWebHashHistory } from 'vue-router';
//  import LoginForm from './views/LoginForm.vue';
// import HomePage from './views/HomePage.vue';
// Import other components/views as needed

const routes = [
    {
        path: "/",
        name: "HomePage",
        component: () => import("@/views/HomePage.vue"),
      },
      {
        path: "/login",
        name: "LoginForm",
        component: () => import("@/views/LoginForm.vue"),
      },
      {
        path: "/applicationForm", 
        name: "ApplicationForm",
        component: () => import("@/views/VAplicationForm.vue"),
      },
    { 
        path: "/FormaEKyqjes",
        name: "LoginForma",
        component: () => import("@/views/FormaEKyqjes.vue"),  
    },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});



export default  router;
