import Cookies from 'js-cookie';
import VueJwtDecode from 'vue-jwt-decode';

const authorizeMiddleware = (to, from, next) => {
  const token = Cookies.get('token');

  if (to.path === '/login' && token) {
    next('/statistics');
  } else if (to.meta.requiresAuth && !token) {
    next('/login');
  } else if (to.meta.requiresAuth && token) {
    const decodedToken = VueJwtDecode.decode(token);
    const userRole = decodedToken.role;
    
    if (!to.meta.requiredRoles.includes(userRole)) {
      next('/unAuth');
    } else {
      next();
    }
  } else {
    next();
  }
};

export default authorizeMiddleware;
