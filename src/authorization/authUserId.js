import Cookies from 'js-cookie';
import VueJwtDecode from 'vue-jwt-decode';

export const getUserIdFromToken = () => {
    const token = Cookies.get('token');
    if (token) {
      const decodedToken = VueJwtDecode.decode(token);
      const userId =decodedToken.nameid;
      return userId

    }
    return null;

  };