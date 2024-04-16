import Cookies from 'js-cookie';
import VueJwtDecode from 'vue-jwt-decode';

const authorizeMiddleware = (to, from, next) => {
      const token = Cookies.get('token');
      console.log("Tokeni i marrur nga cookie:", token); 
      if (to.meta.requiresAuth && !token) {
        next('/login');
      } else if (to.meta.requiresAuth && token) {
        const decodedToken = VueJwtDecode.decode(token);
        console.log("Tokeni i dekodum", decodedToken); 
        const userRole = decodedToken.role;
        console.log("roli", userRole); 
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
