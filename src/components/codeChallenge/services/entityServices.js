import axios from "axios";

const entity = {
  endpoint: "https://api.remotebootcamp.dev/api/entities/Products"
};

const postEntity = (payload) => {
  const config = {
    method: "POST",
    data: payload,
    url: entity.endpoint ,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};



const entityServices = { postEntity };
export default entityServices;