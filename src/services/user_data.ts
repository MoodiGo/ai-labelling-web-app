import { auth } from "../firebase";
import { UserInfo } from "../models/UserInfo";

export class UserDataService {
    private userInfo : UserInfo | null;

    constructor() {
        this.userInfo = null;
    }

    setUserInfo(userInfo: UserInfo) {
        this.userInfo = userInfo;
    }

    async getUserInfo(): Promise<UserInfo | null> {
        if(auth.getCurrentUser()===null) {
            return null;
        }
        const user = await UserInfo.getFromDb(auth.getCurrentUser()?.uid || '');
        if(user) {
            return user;
        } else {
            console.error("User not found in database.");
            this.userInfo = null;
            return null;
        }
    }

    clearUserInfo() {
        this.userInfo = null;
    }
}

export const userDataService = new UserDataService();
