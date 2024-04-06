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
  detailClass = {};
  ClassByUser = {};
  PupilByClass = {};
  PupilByLesson = {};
  LessonByClass = {};
  LessonByUser = {};
  InforUser = {};
  testMsg = undefined;
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

  /* The above code appears to be a comment block in JavaScript. It is not performing any specific
  action in the code. */
  setIsLoading = (value) => {
    this.isLoading = value;
  };

  login = async (credentials) => {
    this.setIsLoading(true);
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
    this.setIsLoading(false);
  };

  getAllUsers = async () => {
    this.setIsLoading(true);
    await axiosAgents.AuthAction.getAllUsers().then((response) => {
      if (response.errCode === 200) {
        runInAction(() => {
          this.userList = response.data;
        });
      } else {
        console.log(response.errMsg);
      }
    });
    this.setIsLoading(false);
  };

  getAllSubjects = async () => {
    this.setIsLoading(true);
    await axiosAgents.SubjectAction.getAllSubjects().then((response) => {
      if (response.errCode === 200) {
        runInAction(() => {
          this.subjectList = response.data;
        });
      } else {
        console.log(response.errMsg);
      }
    });
    this.setIsLoading(false);
  };

  getAllRooms = async () => {
    this.setIsLoading(true);
    await axiosAgents.RoomAction.getAllRooms().then((response) => {
      if (response.errCode === 200) {
        runInAction(() => {
          this.roomList = response.data;
        });
      } else {
        console.log(response.errMsg);
      }
    });
    this.setIsLoading(false);
  };

  getAllPupils = async () => {
    this.setIsLoading(true);
    await axiosAgents.PupilAction.getAllPupils().then((response) => {
      if (response.errCode === 200) {
        runInAction(() => {
          this.pupilList = response.data;
        });
      } else {
        console.log(response.errMsg);
      }
    });
    this.setIsLoading(false);
  };

  getAllClasses = async () => {
    this.setIsLoading(true);
    await axiosAgents.ClassAction.getAllClasses().then((response) => {
      if (response.errCode === 200) {
        runInAction(() => {
          this.classList = response.data;
        });
      } else {
        console.log("getAllClassFailed", response.errMsg);
      }
    });
    this.setIsLoading(false);
  };

  getClassByUser = async (body) => {
    this.setIsLoading(true);
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
    this.setIsLoading(false);
  };

  // getInforUser = async (userID) => {
  //   this.setIsLoading(true);
  //   await axiosAgents.AdminAction.getInforUser(userID)
  //     .then((response) => {
  //       runInAction(() => {
  //         this.InforUser = response;
          
  //       });
  //       console.log("Info of User", response.data);
  //     })
  //     .catch(() => {
  //       console.log("Infor User Failed");
  //     });
  //   this.setIsLoading(false);
  // };

  getPupilByClass = async (body) => {
    this.setIsLoading(true);
    await axiosAgents.ClassAction.getPupilByClass(body).then((response) => {
      if (response.errCode === 200) {
        runInAction(() => {
          this.PupilByClass = response.data;
        });
      } else {
        // console.log(response.errMsg);
      }
    });
    this.setIsLoading(false);
  };

  getPupilByLesson = async (body) => {
    this.setIsLoading(true);
    await axiosAgents.LessonAction.getPupilByLesson(body).then((response) => {
      if (response.errCode === 200) {
        runInAction(() => {
          this.PupilByLesson = response.data;
        });
      } else {
        console.log("lololo", response);
      }
    });
    this.setIsLoading(false);
  };

  getLessonByClass = async (body) => {
    this.setIsLoading(true);
    await axiosAgents.LessonAction.getLessonByClass(body).then((response) => {
      if (response.errCode === 200) {
        runInAction(() => {
          this.LessonByClass = response.data;
        });
      } else {
        console.log("q", response.errMsg);
      }
    });
    this.setIsLoading(false);
  };
  getLessonByUser = async (body) => {
    this.setIsLoading(true);
    await axiosAgents.LessonAction.getLessonByUser(body).then((response) => {
      if (response.errCode === 200) {
        runInAction(() => {
          this.LessonByUser = response.data;
          console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq123", response);
        });
      } else {
        console.log("q", response.errMsg);
      }
    });
    this.setIsLoading(false);
  };

  updateUserInfo = async (newUserInfo) => {
    this.setIsLoading(true);
    await axiosAgents.AuthAction.updateUserInfo(newUserInfo).then(
      (response) => {
        // console.log("Update log", response.token);
        localStorage.setItem("userInfo", response.token)
        // runInAction(() => {
          this.currentUserToken = response.token
        // })
      }
    );
    // await this.getInforUser();
    this.setIsLoading(false);
  };

  lockAndUnlockUser = async (id, body) => {
    this.setIsLoading(true);
    await axiosAgents.AdminAction.lockAndUnlockUser(id, body).then(
      (response) => {
        console.log("theResponse", response);
      }
    );
    this.setIsLoading(false);
  };

  updateRole = async (body) => {
    this.setIsLoading(true);
    await axiosAgents.AdminAction.updateRole(body).then((response) => {
      console.log("theResponse", response);
    });
    this.setIsLoading(false);
  };

  // updateSubject = async (body) => {
  //   this.setIsLoading(true);
  //   await axiosAgents.SubjectAction.updateSubject(body).then((response) => {
  //     console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzze", response);
  //     if (response.errCode === 200) {
  //       runInAction(() => {
  //         this.testMsg = response;
  //       });
  //     } else {
  //       this.testMsg = response;
  //     }
  //   });
  //   await this.getAllSubjects();
  //   this.setIsLoading(false);
  // };
  updateSubject = async (body) => {
    this.setIsLoading(true);
    try {
      const response = await axiosAgents.SubjectAction.updateSubject(body);
      console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzze", response);
      if (response && response.errCode === 200) {
        runInAction(() => {
          this.testMsg = response;
        });
      } else {
        this.testMsg = response;
      }
      await this.getAllSubjects();
    } catch (error) {
      console.error("Error updating subject:", error);
      this.testMsg = { errCode: 500, errMsg: "System error!" };
    }
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
    await axiosAgents.ClassAction.updateClass(body).then((response) => {});
    await this.getAllClasses();
    this.setIsLoading(false);
  };

  updateLesson = async (body) => {
    this.setIsLoading(true);
    await axiosAgents.LessonAction.updateLesson(body).then((response) => {});
    await this.getLessonByClass();
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
    this.setIsLoading(true);
    await axiosAgents.AdminAction.createUser(body).then((response) => {
      console.log("theResponse", response);
    });
    this.setIsLoading(false);
  };

  createSubject = async (body) => {
    this.setIsLoading(true);
    await axiosAgents.SubjectAction.createSubject(body).then((response) => {
      console.log("theResponse", response);
      // this.testMsg = response;
    });
    this.setIsLoading(false);
  };

  createRoom = async (body) => {
    this.setIsLoading(true);
    await axiosAgents.RoomAction.createRoom(body).then((response) => {
      console.log("theResponse123", response, body);
    });
    this.setIsLoading(false);
  };

  createPupil = async (body) => {
    this.setIsLoading(true);
    await axiosAgents.PupilAction.createPupil(body).then((response) => {
      // console.log("theResponse", response);
    });
    this.setIsLoading(false);
  };

  createClass = async (body) => {
    this.setIsLoading(true);
    await axiosAgents.ClassAction.createClass(body).then((response) => {});
    this.setIsLoading(false);
  };
  createLesson = async (body) => {
    this.setIsLoading(true);
    await axiosAgents.LessonAction.createLesson(body).then((response) => {
      console.log("bbbbbbbbbbbbbbbbbbbbb", response);
    });
    this.setIsLoading(false);
  };
  removePupilInClass = async (body) => {
    console.log("body", body);
    this.setIsLoading(true);
    await axiosAgents.ClassAction.removePupilInClass(body).then((response) => {
      console.log("theResponse456", response, "ggg", body);
    });
    await this.getPupilByClass(body);
    this.setIsLoading(false);
  };
  addPupilInClass = async (body) => {
    this.setIsLoading(true);
    await axiosAgents.ClassAction.addPupilInClass(body).then((response) => {});
    await this.getPupilByClass(body);
    this.setIsLoading(false);
  };
  presentPupilInClass = async (body) => {
    this.setIsLoading(true);
    await axiosAgents.LessonAction.presentPupilInClass(body).then(
      (response) => {}
    );
    await this.getPupilByClass(body);
    this.setIsLoading(false);
  };
  absentPupilInClass = async (body) => {
    this.setIsLoading(true);
    await axiosAgents.LessonAction.absentPupilInClass(body).then(
      (response) => {}
    );
    await this.getPupilByClass(body);
    this.setIsLoading(false);
  };
  // updatePupilStatusInClass = async (body) => {
  //   this.setIsLoading(true);
  //   console.log("fffffffffffffffffffffffffffffffffff", body);
  //   await axiosAgents.ListPupilAction.updatePupilStatusInClass(body).then(
  //     (response) => {
  //       // console.log("first", response);
  //     }
  //   );

  //   await this.getPupilByClass(body);
  //   this.setIsLoading(false);
  // };

  // Hàm gửi yêu cầu để lấy thông tin người dùng hiện tại từ server
  loadCurrentUserInfo = async () => {
    try {
      // Gửi yêu cầu HTTP đến backend để lấy thông tin người dùng hiện tại
      const response = await fetch("/api/getCurrentUserInfo"); // Đây là endpoint cần được định nghĩa trên server
      const data = await response.json();

      // Cập nhật thông tin người dùng hiện tại trong store với dữ liệu nhận được từ server
      this.currentUserInfo = data.user; // Giả sử server trả về dữ liệu người dùng trong đối tượng user
    } catch (error) {
      console.error("Error loading current user info:", error);
      // Xử lý lỗi nếu cần
    }
  };
}
