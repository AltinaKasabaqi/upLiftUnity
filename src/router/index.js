import { createRouter, createWebHashHistory } from 'vue-router';
import authorizeMiddleware from '../authorization/auth';

const routes = [
  {
      path: "/",
      name: "HomePage",
      component: () => import("@/views/HomePage.vue"),
       meta: { requiresAuth: false } 
    },
    {
    path: '/myDashboard',
    name: 'AdminDashboard',
    component: () => import("@/dashboards/profilePage.vue"),
    meta: { requiresAuth: true, requiredRoles: 'SuperAdmin' },
    children: [
      {
        path: '',
        name: 'Statistics',
        component: () => import("@/dashboards/statisticsPage.vue"),
      },
    {
      path: "/chat",
      name: "LiveChat",
      component: () => import("@/components/liveChat.vue"),
      meta: { requiresAuth: true, requiredRoles: ['SuperAdmin','SuperVisor','Volunteer']}
    },
    {
      path: "/register",
      name: "SignUpForm",
      component: () => import("@/views/SignUpForm.vue"),
      meta: { requiresAuth: true, requiredRoles: 'SuperAdmin' }
    },
    // {
    //   path: "/myDashboard",
    //   name: "AdminDashboard",
    //   component: () => import("@/dashboards/profilePage.vue"),
    //   meta: { requiresAuth: true, requiredRoles: 'SuperAdmin' }
    // },
    {
      path: "/allUsersView",
      name: "AllUsers",
      component: () => import("@/dashboards/allUsersDash.vue"),
      meta: { requiresAuth: true, requiredRoles: 'SuperAdmin' }
    
    },  
    {
      path: "/UpdateUser:id?",
      name: "UpdateUser",
      component: () => import("@/dashboards/updateUser.vue"),
      meta: { requiresAuth: true, requiredRoles: 'SuperAdmin' }
    },
  
    {
      path: "/applications",
      name: "ApplicationDash",
      component: () => import("@/dashboards/applicationDash.vue"),
      meta: { requiresAuth: true, requiredRoles: 'SuperAdmin' }
    },
    {
      path: "/donations",
      name: "DonationsDash",
      component: () => import("@/dashboards/donationDash.vue"),
      meta: { requiresAuth: true, requiredRoles: 'SuperAdmin' }
    },]
  },
 
  { 
      path: "/Login",
      name: "LoginForma",
      component: () => import("@/views/LogIn.vue")  
  },
  {
    path: "/applicationForm", 
    name: "ApplicationForm",
    component: () => import("@/views/VAplicationForm.vue"),
  },
  {
    path: "/RulesForma", 
    name: "RulesForma",
    component: () => import("@/dashboards/RulesForma.vue"),
  },
  {
    path: "/CallForm", 
    name: "CallForm",
    component: () => import("@/dashboards/CallForm.vue"),
  },
  {
    path: '/AboutUs',
    name: 'AboutUs',
    component: () => import('@/views/AboutUs.vue'),
    meta: { requiresAuth: false }
  }
  


];



const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


router.beforeEach((authorizeMiddleware))


export default router;
