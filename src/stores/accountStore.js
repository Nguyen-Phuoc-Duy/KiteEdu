import { autorun, makeAutoObservable, runInAction } from "mobx";
import axiosAgents from "../agent/axiosAgent";
import { jwtDecode } from "jwt-decode";

export default class AccountStore {
  currentUserToken = localStorage.getItem("userInfo") || undefined;
  currentUserInfo = undefined;
  errorMessage = undefined;
  userList = {};

  constructor() {
    makeAutoObservable(this);

    autorun(() => {
      if (this.currentUserToken) {
        this.currentUserInfo = jwtDecode(this.currentUserToken);
      }
    });
  }

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
}
