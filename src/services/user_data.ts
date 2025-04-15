import { UserInfo } from "../models/UserInfo";

export class UserDataService {
    private userInfo : UserInfo | null;

    constructor() {
        this.userInfo = null;
    }

    setUserInfo(userInfo: UserInfo) {
        this.userInfo = userInfo;
    }

    getUserInfo(): UserInfo | null {
        return this.userInfo;
    }

    clearUserInfo() {
        this.userInfo = null;
    }
}

export const userDataService = new UserDataService();
