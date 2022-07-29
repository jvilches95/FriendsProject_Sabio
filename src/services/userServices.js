import axios from "axios";

const user = {
    endpoint: "https://api.remotebootcamp.dev/api/users"
}

const userLogin = (payload) => {
   
    const config = {
      method: "POST",
      url: user.endpoint + "/login",
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };

      return axios(config);
  };

const userRegister = (payload) => {
   
        const config = {
          method: "POST",
          url: user.endpoint + "/register",
          data: payload,
          crossdomain: true,
          headers: { "Content-Type": "application/json" },
        };
    
          return axios(config);
  };

const getCurrentUser = () => {
  const config = {
    method: "GET",
    url: user.endpoint + "/current",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

    return axios(config);
}  

const getUser = (id) => {
  const config = {
    method: "GET",
    url: user.endpoint + "/" + id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

    return axios(config);
}  

const userLogOut = () => {
  const config = {
    method: "GET",
    url: user.endpoint + "/logout",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

    return axios(config);
}  

const userService = {userLogin, userRegister, getCurrentUser, getUser, userLogOut}
export default userService;
