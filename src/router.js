
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
        path: "/chat",
        name: "LiveChat",
        component: () => import("@/components/liveChat.vue"),
      },
      {
        path: "/register",
        name: "SignUpForm",
        component: () => import("@/views/SignUpForm.vue"),
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
      }

 
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});



export default  router;
