// import Vue from 'vue';
// import VueCookies from 'vue-cookies';
// import jwt_decode from 'jwt-decode';

// Vue.use(VueCookies);

import Cookies from 'js-cookie';
import VueJwtDecode from 'vue-jwt-decode';

const authorizeMiddleware = (to, from, next) => {
//     const token = Vue.$cookies.get('token');
   
//     if (!token) {
//         next('/login');
//         return;
//     }

//     const decodedToken = jwt_decode(token);

//     const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

//     if (to.meta.roles && !to.meta.roles.includes(userRole)) {
//         next('/unauthorized');
//         return;
//     }

//     next();

const token = Cookies.get('token');
if (to.meta.requiresAuth && !token) {
  next('/login');
} else if (to.meta.requiresAuth && token) {
  const decodedToken = VueJwtDecode.decode(token);
  const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  if (userRole !== to.meta.requiredRole) {
    next('/unauthorized');
  } else {
    next();
  }
} else {
  next();
}
};


export default authorizeMiddleware;
