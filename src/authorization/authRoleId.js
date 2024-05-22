import Cookies from 'js-cookie';
import VueJwtDecode from 'vue-jwt-decode';

export const geRoleFromToken = () => {
    const token = Cookies.get('token');
    if (token) {
      const decodedToken = VueJwtDecode.decode(token);
      const role =decodedToken.role;
      return role

    }
    return null;

  };