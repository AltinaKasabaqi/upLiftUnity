import Cookies from 'js-cookie';
import VueJwtDecode from 'vue-jwt-decode';

export const getUserEmailFromToken = () => {
    const token = Cookies.get('token');
    if (token) {
      const decodedToken = VueJwtDecode.decode(token);
      const userEmail =decodedToken.email;
      return userEmail

    }
    return null;

  };