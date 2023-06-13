import { action, makeAutoObservable, observable } from "mobx";
import axios, * as others from 'axios';
import { BASE_URL } from "../consts";

export interface user {
    user_name: string;
    password: string;
    mail: string;
    isSuperviosr: boolean;
    homeAddress?: string;
    contactNumber?: string;
  }

export interface existUser {
    user_name: string;
    password: string;
}

export enum settingsDialogs {
    AccountDialog,
    PreferencesDialog,
}

class UserStore {
    user: user | null = null;
    secretKey: string| null = null;
    audioPermissions: boolean = false;
    currentOpenDialog: settingsDialogs | null = null;
    errorMessage: boolean = false;

    constructor() {
        makeAutoObservable(this, {
            user: observable,
            secretKey: observable,
            audioPermissions: observable,
            setUser: action,
            setAudioPremissions: action,
            setToken: action
        });
    }

    setUser = (userInfo: user) => {
        this.user = userInfo;
    }

    setAudioPremissions(isPermit: boolean) {
        this.audioPermissions = isPermit;
    }

    setToken(token: string) {
        this.secretKey = token;
    }

    // Login user action
    loginUser = async (loggedUser: existUser) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/user/login`,{
                email: loggedUser.user_name,
                password: loggedUser.password    
            
        });
            this.setErrorMessage(false);
            const data = response.data;
            console.log(response)
            this.setToken(data.token);
            const user: user = {
                user_name: loggedUser.user_name,
                password: loggedUser.password,
                mail: data.mail,
                isSuperviosr: data.isInCharge,
                homeAddress: data.homeAddress,
                contactNumber: data.contactNumber
            }
            this.setUser(user);
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                this.setErrorMessage(true);
            } else{
            console.error('Error logging in user:', error);
            }
        }
    };

    // Signup user action
    signupUser = async (newUser: user) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/user/signup`,
                {
                    name: newUser.user_name,
                    password: newUser.password,
                    email: newUser.mail,
                    isInCharge: newUser.isSuperviosr,
                    homeAddress: newUser.homeAddress,
                    contactNumber: newUser.contactNumber
                }
            );
            const data = response.data;
            console.log(response)
            this.setToken(data.token);
            this.setUser(newUser)
        } catch (error) {
            console.error('Error signing up user:', error);
        }
    };


    public editUser = async (
        name?: string,
        mail?: string,
        homeAddress?: string,
        contactNumber?: string,
      ) => {
        try {
          let res = await axios.put(
            `${BASE_URL}/api/user?id=${this.user?.user_name}`,
            {
                name: name,
                mail: mail,
                homeAddress: homeAddress,
                contactNumber: contactNumber
            },
            {
              headers: {
                Authorization: userStore.secretKey,
              },
            }
          );
        } catch (error) {
          console.log(`Error in editing user: ${error}`);
        }
      };

    public logOut= () => {
        this.user = null;
        this.secretKey = null;
        this.audioPermissions = false;
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

    public setRole(isSuperviosr: boolean):void{
        if(this.user) this.user.isSuperviosr = isSuperviosr;
    }

    setErrorMessage(message: boolean) {
        this.errorMessage = message;
    }



}

const userStore = new UserStore();
export default userStore;