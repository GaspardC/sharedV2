let projectBaseKey = "";
try {
  projectBaseKey =
    require("@my-monorepo/shared-local/src/utils/storage/index")
      ?.LOCAL_STORAE_BASE_KEY ?? "add_storage_name";
} catch (e) {
  console.log("cannopt find base key", e);
}
const BASE_KEY = `myls_${projectBaseKey}`;

import { isEmpty } from "lodash";
// export const STORAGE_KEYS = "user";

import storage from "./storage";

export const setItem = async (key: string, val: any) => {
  try {
    if (isEmpty(val)) {
      return removeItem(key);
    }
    const valStr = JSON.stringify(val);

    await storage.setItem(`${BASE_KEY}_${key}`, valStr);
  } catch (e) {
    console.error(e);
  }
};

export const clear = () => storage.clear();
export const removeItem = async (key: string) => {
  try {
    await storage.removeItem(`${BASE_KEY}_${key}`);
  } catch (e) {
    console.error(e);
  }
};
export const getItem = async (key: string) => {
  try {
    const item = await storage.getItem(`${BASE_KEY}_${key}`);
    if (!item) return null;
    return JSON.parse(item);
  } catch (e) {
    console.error(e);
  }
};

export default {
  getItem,
  setItem,
  removeItem,
  clear
};
