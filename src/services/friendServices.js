import axios from "axios";

const friend = {
  endpoint: "https://localhost:50001/api/friends/",
};

const getFriend = () => {
  const config = {
    method: "GET",
    url: friend.endpoint + "paginate/?pageIndex=0&pageSize=8",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const deleteFriend = (id) => {
  const config = {
    method: "DELETE",
    url: friend.endpoint + "/" + id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(() => {
    return id;
  });
};

const addFriend = (payload) => {
  const config = {
    method: "POST",
    data: payload,
    url: friend.endpoint ,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then((data)=> {
    return data.data.item
  });
};

const queryFriends = (query) => {
  const config = {
    method: "GET",
    url: friend.endpoint + "/search?pageIndex=0&pageSize=2&q=" + query,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const editFriend = (id,payload) => {
  const config = {
    method: "PUT",
    url: friend.endpoint + "/" + id,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};



const friendServices = { getFriend, deleteFriend, addFriend, queryFriends, editFriend };
export default friendServices;
