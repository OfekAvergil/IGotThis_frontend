import { useRadioGroup } from "@mui/material";
import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";

class UserStore{
    user_name: string | null = null;
    user_password: string | null = null;

    constructor(){
        makeAutoObservable(this,{
            user_name: observable,
            user_password: observable,
            setUser: action,
        });
    }
    
    setUser(user_name: string | null, user_password: string | null){
        this.user_name= user_name;
        this.user_password=  user_password;
    }

}

const userStore = new UserStore();
export default userStore;