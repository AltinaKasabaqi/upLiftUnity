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
    meta: { requiresAuth: true, requiredRoles: ['SuperAdmin', 'SuperVisor', 'Volunteer'] },
    children: [
      {
        path: '/statistics',
        name: 'Statistics',
        component: () => import("@/dashboards/statistics/statisticsPage.vue"),
      },
      {
        path: "/chat",
        name: "LiveChat",
        component: () => import("@/components/liveChat.vue"),
        meta: { requiresAuth: true, requiredRoles: ['SuperAdmin', 'SuperVisor', 'Volunteer'] }
      },
      {
        path: "/register",
        name: "SignUpForm",
        component: () => import("@/views/SignUpForm.vue"),
        meta: { requiresAuth: true, requiredRoles: 'SuperAdmin' }
      },
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
      },
      {
      path: "/callsHistory",
      name: "callsHistory",
      component: () => import("@/dashboards/callsHistory.vue"),
      meta: { requiresAuth: true, requiredRoles: ['SuperAdmin','SuperVisor','Volunteer'] }
    },
    {
        path: "/userActivities",
        name: "UserActivities",
        component: () => import("@/dashboards/userActivities.vue"),
      meta: { requiresAuth: true, requiredRoles: 'SuperAdmin' }

      }, {
        path: "/callRate",
        name: "CallRiskRate",
        component: () => import("@/components/Calls/callRiskRating.vue"),
        meta: { requiresAuth: true, requiredRoles: ['SuperAdmin', 'SuperVisor', 'Volunteer'] }
      },
      {
        path: "/calendar",
        name: "CalendarV",
        component: () => import("@/Calendar/calendar.vue"),
        meta: { requiresAuth: true }
    
    },
    {
      path: "/mySchedule",
      name: "MySchedule",
      component: () => import("@/dashboards/mySchedule.vue"),
      meta: { requiresAuth: true }

      },
      {
        path: "/addNotes",
        name: "MyNotes",
        component: () => import("@/components/Notes/addNotesForm.vue"),
        meta: { requiresAuth: true, requiredRoles: 'Volunteer' }
      },
    ]
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
    path: "/donationPackages",
    name: "DonationPackages",
    component: () => import("@/components/donationPackages.vue"),
  },

];



const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


router.beforeEach((authorizeMiddleware))


export default router;
