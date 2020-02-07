import AXIOS from "../Config/Axios";
import Prefix from "../Config/ApiPrefix"
import headers from "../helpers/headers";

const Auth = {
  login(data) {
    return AXIOS.post(`${Prefix.api}/auth/login`, {
      ...data
    });
  },
  checkLogin() {
    return AXIOS.get(`${Prefix.api}/auth/check-login`, { headers: headers() });
  }
};

export default Auth;
