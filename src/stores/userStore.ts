import { action, makeAutoObservable, observable } from "mobx";
import {
  sendEditUser,
  sendLogin,
  sendResetPassword,
  sendSignUp,
} from "../api/REST_Requests";
import { Strings } from "../consts";
import eventsStore from "./eventsStore";

export interface user {
  user_name: string;
  password: string;
  mail: string;
  isSuperviosr: boolean;
  homeAddress?: string;
  contactNumber?: string;
  phoneToken?: string;
}

export interface existUser {
  mail: string;
  password: string;
}

export interface restoreData {
  user_name: string;
  mail: string;
  password: string;
}

export enum settingsDialogs {
  AccountDialog,
  PreferencesDialog,
  HelpDialog
}

class UserStore {
  user: user | null = null;
  secretKey: string | null = null;
  audioPermissions: boolean = false;
  currentOpenDialog: settingsDialogs | null = null;
  errorMessage: string = "";
  expoPushToken: string | undefined;

  constructor() {
    makeAutoObservable(this, {
      user: observable,
      secretKey: observable,
      audioPermissions: observable,
      setUser: action,
      setAudioPremissions: action,
      setToken: action,
    });
  }

  setUser = (userInfo: user) => {
    this.user = userInfo;
  };

  setAudioPremissions(isPermit: boolean) {
    this.audioPermissions = isPermit;
  }

  setToken(token: string) {
    this.secretKey = token;
  }

  // Login user action
  loginUser = async (loggedUser: existUser) => {
    try {
      const response = await sendLogin(loggedUser.mail, loggedUser.password, this.expoPushToken );
      this.setErrorMessage("");
      const data = response.data;
      this.setToken(data.token);
      const user: user = {
        user_name: data.user.name,
        password: data.user.password,
        mail: data.user.email,
        isSuperviosr: data.user.isInCharge,
        homeAddress: data.user.homeAddress,
        contactNumber: data.user.contactNumber,
        phoneToken: data.user.contactNumber.phoneToken
      };
      if(data.user.isInCharge) {
        this.setExpoPushToken(data.user.contactNumber.phoneToken)
      }
      this.setUser(user);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        this.setErrorMessage(Strings.error_login_data);
      } else {
        this.setErrorMessage(`${Strings.error_login_connection} ${error}`);
      }
    }
  };

  // Login user action
  restPassword = async (loggedUser: restoreData) => {
    try {
      const response = await sendResetPassword(
        loggedUser.mail,
        loggedUser.user_name,
        loggedUser.password
      );
      this.setErrorMessage("");
      const data = response.data;
      this.setToken(data.token);
      const user: user = {
        user_name: data.user.name,
        password: data.user.password,
        mail: data.user.mail,
        isSuperviosr: data.user.isInCharge,
        homeAddress: data.user.homeAddress,
        contactNumber: data.user.contactNumber,
      };
      this.setUser(user);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        this.setErrorMessage(Strings.error_login_data);
      } else {
        this.setErrorMessage(`${Strings.error_login_connection} ${error}`);
      }
    }
  };

  // Signup user action
  signupUser = async (newUser: user) => {
    try {
      const response = await sendSignUp(newUser);
      const data = response.data;
      this.setToken(data.token);
      this.setUser(newUser);
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        this.setErrorMessage(Strings.error_user_exist);
      } else {
        this.setErrorMessage(`${Strings.error_register_connection} ${error}`);
      }
    }
  };

  public editUser = async (
    mail: string,
    name?: string,
    homeAddress?: string,
    contactNumber?: string
  ) => {
    try {
      let res = await sendEditUser(
        mail,
        userStore.secretKey,
        name,
        homeAddress,
        contactNumber
      );
    } catch (error) {
      console.log(`${Strings.error_editing_connection} ${error}`);
    }
  };

  public logOut = () => {
    this.user = null;
    this.secretKey = null;
    this.audioPermissions = false;
  };

  public setExpoPushToken(token: string | undefined): void {
    this.expoPushToken = token;
  }

  public isDialogOpen(dialog: settingsDialogs): boolean {
    return this.currentOpenDialog === dialog;
  }

  public openDialog(dialog: settingsDialogs): void {
    this.currentOpenDialog = dialog;
  }

  public closeAllDialogs(): void {
    this.currentOpenDialog = null;
  }

  public setRole(isSuperviosr: boolean): void {
    if (this.user) this.user.isSuperviosr = isSuperviosr;
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
  }
}

const userStore = new UserStore();
export default userStore;
