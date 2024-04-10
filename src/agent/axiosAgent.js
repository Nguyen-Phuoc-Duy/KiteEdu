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
  },
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
};

const AdminAction = {
  lockAndUnlockUser: (id, body) => {
    return request.post(`/admin/lockOrUnlockUser/${id}`, body);
  },
  updateRole: (body) => {
    return request.post(`/admin/updateUserRole`, body);
  },
  updateUserSubject: (body) => {
    return request.post(`/admin/updateUserSubject`, body);
  },
  createUser: (body) => {
    return request.post(`/admin/createUser`, body);
  },
  getInforUser: (userID) => {
    return request.get(`/getInforUser/${userID}`);
  }
};

const SubjectAction = {
  getAllSubjects: () => {
    return request.get(`/subjects/getAll`);
  },
  updateSubject: (body) => {
    return request.post(`/admin/updateSubject`, body);
  },
  createSubject: (body) => {
    return request.post(`/admin/createSubject`, body);
  },
};

const RoomAction = {
  getAllRooms: () => {
    return request.get(`/rooms/getAll`);
  },
  updateRoom: (body) => {
    return request.post(`/admin/updateRoom`, body);
  },
  createRoom: (body) => {
    return request.post(`/admin/createRoom`, body);
  },
};
const PupilAction = {
  getAllPupils: () => {
    return request.get(`/pupils/getAll`);
  },
  updatePupil: (body) => {
    return request.post(`/pupil/updatePupil`, body);
  },
  createPupil: (body) => {
    return request.post(`/pupil/createPupil`, body);
  },
};

const ClassAction = {
  getAllClasses: () => {
    return request.get(`/classes/getAll`);
  },
  updateClass: (body) => {
    return request.post(`/class/updateClass`, body);
  },
  createClass: (body) => {
    return request.post(`/class/createClass`, body);
  },
  getClassByUser: (body) => {
    return request.post(`/class/getClassByUser`, body);
  },
  getPupilByClass: (body) => {
    return request.post(`/class/getPupilByClass`, body);
  },
  removePupilInClass: (body) => {
    return request.post(`/class/removePupilInClass`, body);
  },
  addPupilInClass: (body) => {
    return request.post(`/class/addPupilInClass`, body);
  },
  getDetailClass: (body) => {
    return request.post(`/class/getDetailClass`, body);
  },
};

const LessonAction = {
  getPupilByLesson: (body) => {
    return request.post(`/lesson/getPupilByLesson`, body);
  },
  getLessonByClass: (body) => {
    return request.post(`/lesson/getLessonByClass`, body);
  },
  getLessonByUser: (body) => {
    return request.post(`/lesson/getLessonByUser`, body);
  },
  getDetailLesson: (body) => {
    return request.post(`/lesson/getDetailLesson`, body);
  },
  createLesson: (body) => {
    return request.post(`/lesson/createLesson`, body);
  },
  updateLesson: (body) => {
    return request.post(`/lesson/updateLesson`, body);
  },
  presentPupilInClass: (body) => {
    return request.post(`/lesson/presentPupilInClass`, body);
  },
  absentPupilInClass: (body) => {
    return request.post(`/lesson/absentPupilInClass`, body);
  },
};

const ListPupilAction = {
  updatePupilStatusInClass: (body) => {
    return request.post(`/listpupil/updatePupilStatusInClass`, body);
  },
};
const axiosAgents = {
  AuthAction,
  AdminAction,
  SubjectAction,
  RoomAction,
  PupilAction,
  ClassAction,
  LessonAction,
  ListPupilAction,
};

export default axiosAgents;
