import { createRouter, createWebHashHistory } from 'vue-router';
// import Cookies from 'js-cookie';
// import VueJwtDecode from 'vue-jwt-decode';
import authorizeMiddleware from './auth';

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
      
    },
    {
      path: "/chat",
      name: "LiveChat",
      component: () => import("@/components/liveChat.vue"),
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
      component: () => import("@/dashboards/superDashboard.vue"),
    },
    {
      path: "/allUsersView",
      name: "AllUsers",
      component: () => import("@/dashboards/allUsersDash.vue"),
    },
    {
      path: "/UpdateUser:id?",
      name: "UpdateUser",
      component: () => import("@/dashboards/updateUser.vue"),
    },
    {
      path: "/volunteerDash",
      name: "VoolunteerDash",
      component: () => import("@/dashboards/volunteerDash.vue"),
    },
    {
      path: "/applicationsDash",
      name: "ApplicationDash",
      component: () => import("@/dashboards/applicationDash.vue"),
    },


    
  { 
      path: "/Login",
      name: "LoginForma",
      component: () => import("@/views/LogIn.vue")  
  }
];



const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((authorizeMiddleware))
  // const token = Cookies.get('token');
  // if (to.meta.requiresAuth && !token) {
  //   next('/login');
  // } else if (to.meta.requiresAuth && token) {
  //   const decodedToken = VueJwtDecode.decode(token);
  //   const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  //   if (userRole !== to.meta.requiredRole) {
  //     next('/unauthorized');
  //   } else {
  //     next();
  //   }
  // } else {
  //   next();
  // }




export default router;
