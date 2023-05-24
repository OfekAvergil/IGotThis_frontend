import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";
import axios, * as others from 'axios';

class UserStore {
    user_name: string | null = null;
    user_password: string | null = null;
    secretKey: string | null = null;
    audioPermissions: boolean = false;

    constructor() {
        makeAutoObservable(this, {
            user_name: observable,
            user_password: observable,
            secretKey: observable,
            setUser: action,
        });
    }

    setUser(user_name: string | null, user_password: string | null) {
        this.user_name = user_name;
        this.user_password = user_password;
    }


    // Login user action
    loginUser = async (user_name: string | null, user_password: string | null) => {
        try {
            this.user_name = user_name;
            this.user_password = user_password;
            const response = await axios.post('http://localhost:4005/api/user/login', {
                    email: user_name,
                    password: user_password
                });
            const data = response.data;
            console.log(response)
            // Update state with user data and token
            // this.users = [...this.users, data.user];
            this.secretKey = data.token;
        } catch (error) {
            console.error('Error logging in user:', error);
        }
    };

    // Signup user action
    signupUser = async (user_name: string | null, user_password: string | null, email: string | null, isInCharge: boolean | false) => {
        try {
            this.user_name = user_name;
            this.user_password = user_password;
            const response = await axios.post('http://localhost:4005/api/user/signup', {
                name: user_name,
                password: user_password,
                email,
                isInCharge
            });
            const data = response.data;
            console.log(response)
            // Update state with user data and token
            // this.users = [...this.users, data.user];
            this.secretKey = data.token;
        } catch (error) {
            console.error('Error signing up user:', error);
        }
    };

    setAudioPremissions(isPermit: boolean) {
        this.audioPermissions = isPermit;
    }

}

const userStore = new UserStore();
export default userStore;