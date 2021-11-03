import { getItem, setItem, removeItem, clear } from "./storage/utilStorage";
enum ROLES {
  ADMIN = "admin",
  user = "user",
}

export interface UserProps {
  jwt?: string;
  created_at?: string;
  first_name?: string;
  last_name?: string;
  roles?: ROLES[];
  update_password?: "init" | "success" | "pending" | "error";
}
const USER_INFO = "user";

const authToken = {
  /**
   * Remove an item from the used storage
   * @param  {String} key [description]
   */
  async clear(key: string) {
    if (await getItem(key)) {
      return removeItem(key);
    }
    return null;
  },

  /**
   * Clear all app storage
   */
  clearAppStorage() {
    try {
      return clear();
    } catch (e) {
      console.log(e);
    }
  },

  clearUserInfo(userInfo = USER_INFO) {
    return authToken.clear(userInfo);
  },

  async get(): Promise<UserProps> {
    return getItem(USER_INFO);
  },

  async getToken() {
    return (await authToken.get())?.jwt;
  },

  getUserInfo() {
    return authToken.get();
  },
  set(value: any) {
    return setItem("user", value);
  },

  async setToken(value: any) {
    const user = { ...(await authToken.getUserInfo()), jwt: value };
    return authToken.setUserInfo(user);
  },

  setUserInfo(value: UserProps) {
    return authToken.set(value);
  },
};

export default authToken;
