import { autorun, makeAutoObservable, runInAction } from "mobx";
import axiosAgents from "../agent/axiosAgent";
import { jwtDecode } from "jwt-decode";

export default class AccountStore {
  currentUserToken = localStorage.getItem("userInfo") || undefined;
  currentUserInfo = undefined;
  errorMessage = undefined;
  userList = {};
  subjectList = {};
  roomList = {};
  pupilList = {};
  classList = {};
  detailClass = [];
  ClassByUser = [];
  PupilByClass = []
  isLoading = false;

  constructor() {
    makeAutoObservable(this);

    autorun(() => {
      if (this.currentUserToken) {
        runInAction(() => {
          this.currentUserInfo = jwtDecode(this.currentUserToken);
        });
      }
    });
  }

  setIsLoading = (value) => {
    runInAction(() => {
      this.isLoading = value;
    });
  };

  login = async (credentials) => {
    await axiosAgents.AuthAction.login(credentials).then((response) => {
      if (response.errCode === 200) {
        localStorage.setItem("userInfo", response.data.token);
        window.location.replace("/dashboard");
      } else {
        runInAction(() => {
          this.errorMessage = response.errMsg;
        });
      }
    });
  };

  getAllUsers = async () => {
    await axiosAgents.AuthAction.getAllUsers().then((response) => {
      if (response.errCode === 200) {
        runInAction(() => {
          this.userList = response.data;
        });
      } else {
        console.log(response.errMsg);
      }
    });
  };

  getAllSubjects = async () => {
    await axiosAgents.SubjectAction.getAllSubjects().then((response) => {
      if (response.errCode === 200) {
        runInAction(() => {
          this.subjectList = response.data;
        });
      } else {
        console.log(response.errMsg);
      }
    });
  };

  getAllRooms = async () => {
    await axiosAgents.RoomAction.getAllRooms().then((response) => {
      if (response.errCode === 200) {
        runInAction(() => {
          this.roomList = response.data;
        });
      } else {
        console.log(response.errMsg);
      }
    });
  };

  getAllPupils = async () => {
    await axiosAgents.PupilAction.getAllPupils().then((response) => {
      if (response.errCode === 200) {
        runInAction(() => {
          this.pupilList = response.data;
        });
      } else {
        console.log(response.errMsg);
      }
    });
  };

  getAllClasses = async () => {
    await axiosAgents.ClassAction.getAllClasses().then((response) => {
      if (response.errCode === 200) {
        runInAction(() => {
          this.classList = response.data;
        });
      } else {
        console.log("getAllClassFailed", response.errMsg);
      }
    });
  };

  getClassByUser = async (body) => {
    await axiosAgents.ClassAction.getClassByUser(body).then((response) => {
      // console.log('oooooooooooooooo', body)
      if (response.errCode === 200) {
        runInAction(() => {
          this.ClassByUser = response.data;
        });
      } else {
        console.log("getAllClassByUserFailed", response.errMsg);
      }
    });
  };

  getPupilByClass = async (body) => {
    await axiosAgents.ClassAction.getPupilByClass(body).then((response) => {
      console.log('getPupilByClass', body)
      if (response.errCode === 200) {
        runInAction(() => {
          this.PupilByClass = response.data;
        });
      } else {
        console.log("Failed", response.errMsg);
      }
    });
  };


  updateUserInfo = async (newUserInfo) => {
    await axiosAgents.AuthAction.updateUserInfo(newUserInfo).then(
      (response) => {
        if (response.errCode === 200) {
          runInAction(() => {
            console.log(response.errMsg);
          });
        } else {
          console.log(response.errMsg);
        }
      }
    );
  };

  lockAndUnlockUser = async (id, body) => {
    await axiosAgents.AdminAction.lockAndUnlockUser(id, body).then(
      (response) => {
        console.log("theResponse", response);
      }
    );
  };

  updateRole = async (body) => {
    await axiosAgents.AdminAction.updateRole(body).then((response) => {
      console.log("theResponse", response);
    });
  };

  updateSubject = async (body) => {
    this.setIsLoading(true);
    await axiosAgents.SubjectAction.updateSubject(body).then((response) => {
      console.log("theResponse", response);
    });
    await this.getAllSubjects();
    this.setIsLoading(false);
  };

  updateRoom = async (body) => {
    this.setIsLoading(true);
    await axiosAgents.RoomAction.updateRoom(body).then((response) => {
      console.log("theResponse", response);
    });
    await this.getAllRooms();
    this.setIsLoading(false);
  };

  updateClass = async (body) => {
    this.setIsLoading(true);
    await axiosAgents.ClassAction.updateClass(body).then((response) => {
      console.log("theResponse", response);
    });
    await this.getAllClasses();
    this.setIsLoading(false);
  };

  updatePupil = async (body) => {
    this.setIsLoading(true);
    await axiosAgents.PupilAction.updatePupil(body).then((response) => {
      console.log("theResponse", response);
    });
    await this.getAllPupils();
    this.setIsLoading(false);
  };
  adminUpdate = async (
    id,
    updateLockedBody,
    updateRoleBody,
    updateSubjectBody
  ) => {
    this.setIsLoading(true);
    await axiosAgents.AdminAction.updateRole(updateRoleBody).then(
      (response) => {
        console.log("theResponse1", response);
      }
    );

    await axiosAgents.AdminAction.lockAndUnlockUser(id, updateLockedBody).then(
      (response) => {
        console.log("theResponse2", response);
      }
    );

    await axiosAgents.AdminAction.updateUserSubject(updateSubjectBody).then(
      (response) => {
        console.log("theResponse3", response);
      }
    );

    await this.getAllUsers();
    this.setIsLoading(false);
  };

  // updateUserSubject = async(body) => {
  //   await axiosAgents.AdminAction.updateUserSubject(body).then(
  //     (response) => {
  //       console.log("theResponse", response);
  //     }
  //   );
  // }
  createUser = async (body) => {
    await axiosAgents.AdminAction.createUser(body).then((response) => {
      console.log("theResponse", response);
    });
  };

  createSubject = async (body) => {
    await axiosAgents.SubjectAction.createSubject(body).then((response) => {
      console.log("theResponse", response);
    });
  };

  createRoom = async (body) => {
    console.log("body", body);
    await axiosAgents.RoomAction.createRoom(body).then((response) => {
      console.log("theResponse123", response, body);
    });
  };

  createPupil = async (body) => {
    await axiosAgents.PupilAction.createPupil(body).then((response) => {
      console.log("theResponse", response);
    });
  };

  createClass = async (body) => {
    console.log("body", body);
    await axiosAgents.ClassAction.createClass(body).then((response) => {
      console.log("theResponse456", response, "ggg", body);
    });
  };
}
