import { createRouter, createWebHashHistory } from 'vue-router';
// import Cookies from 'js-cookie';
// import VueJwtDecode from 'vue-jwt-decode';
import authorizeMiddleware from './authorization/auth';

const routes = [
  {
      path: "/",
      name: "HomePage",
      component: () => import("@/views/HomePage.vue"),
       meta: { requiresAuth: false } 
    },
    {
      path: "/applicationForm", 
      name: "ApplicationForm",
      component: () => import("@/views/VAplicationForm.vue"),
      meta: { requiresAuth: false } 
      
    },
    {
      path: "/chat",
      name: "LiveChat",
      component: () => import("@/components/liveChat.vue"),
      meta: { requiresAuth: true, roles: ['SuperAdmin', 'Volunteer', 'SuperVisor'] }
    },
    {
      path: "/register",
      name: "SignUpForm",
      component: () => import("@/views/SignUpForm.vue"),
      meta: { requiresAuth: true, requiredRole: 'SuperAdmin' }
    },
    {
      path: "/myDashboard",
      name: "AdminDashboard",
      component: () => import("@/dashboards/profilePage.vue"),
      meta: { requiresAuth: true, requiredRoles: ['SuperAdmin','SuperVisor'] }
    },
    {
      path: "/allUsersView",
      name: "AllUsers",
      component: () => import("@/dashboards/allUsersDash.vue"),
      meta: { requiresAuth: true, requiredRole: 'SuperAdmin'}
    },
    {
      path: "/UpdateUser:id?",
      name: "UpdateUser",
      component: () => import("@/dashboards/updateUser.vue"),
      meta: { requiresAuth: true, requiredRole: 'SuperAdmin'}
    },
  
    {
      path: "/applicationsDash",
      name: "ApplicationDash",
      component: () => import("@/dashboards/applicationDash.vue"),
      meta: { requiresAuth: true, requiredRole: 'SuperAdmin'}
    },


    
  { 
      path: "/Login",
      name: "LoginForma",
      component: () => import("@/views/LogIn.vue"),
      meta: { requiresAuth: false } 
  }
];



const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


router.beforeEach((authorizeMiddleware))


export default router;
