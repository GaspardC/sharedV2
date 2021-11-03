import storage from "../utils/storage/storage";
import { fuego } from "./index";
//login with firebase

export const KEY_LS = "user_firebase";

const useFirebaseLogin = () => {
  const signIn = async ({
    email,
    password
  }: {
    email: string;
    password: string;
  }) => {
    const res = await fuego.auth().signInWithEmailAndPassword(email, password);
    storage.setItem(KEY_LS, JSON.stringify({ email, password }));
    return res;
  };

  return { signIn };
};

export default useFirebaseLogin;

export const firebaseSignout = () => {
  storage.removeItem(KEY_LS);
  return fuego.auth().signOut();
};
