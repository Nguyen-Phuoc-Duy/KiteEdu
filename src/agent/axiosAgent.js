import axios from "axios";
import { store } from "../stores/store";

axios.defaults.baseURL = "http://localhost:2222";

axios.interceptors.request.use((config) => {
  const token = store.accountStore.currentUserToken;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const responseBody = (response) => {
  return response.data;
};

const request = {
  get: (url) => {
    return axios.get(url).then(responseBody);
  },
  post: (url, body) => {
    return axios.post(url, body).then(responseBody);
  }
};

const AuthAction = {
  login: (credentials) => {
    return request.post(`/users/login`, credentials);
  },
  getAllUsers: () => {
    return request.get(`/users/getAll`);
  },
  updateUserInfo: (newUserInfo) => {
    return request.post(`/users/updateProfile`, newUserInfo);
  },
  // updateUserRole: () => {
  //   return request.post(`/updateUserRole`);
  // },
};

const AdminAction = {
  lockAndUnlockUser: (id, body) => {
    return request.post(`/admin/lockOrUnlockUser/${id}`, body);
  },
};

const axiosAgents = { AuthAction, AdminAction };

export default axiosAgents;
