import React, { useState } from "react";
import firebase from "firebase/app";
// import useLocalStorage from "src/hooks/useLocalStorage";
import storage from "../utils/storage/storage";
import useFirebaseLogin, { KEY_LS } from "./useFirebaseLogin";

const useFirebaseUser = (fb: typeof firebase) => {
  const [user, setUser] = useState<firebase.User | "init" | "signout">("init");
  const { signIn } = useFirebaseLogin();

  fb.auth().onAuthStateChanged(async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setUser(user);
      // ...
    } else {
      // User is signed out
      const userCred = JSON.parse((await storage.getItem(KEY_LS)) ?? "{}");
      console.log("relogin", userCred);

      if (userCred?.username) {
        const res = await signIn({
          email: userCred.email,
          password: userCred.password,
        });
        console.log("relogin res", res);
        if (res.user) return;
      }
      setUser("signout");
    }
  });
  return { user, signout: user === "signout", init: user === "init" };
};
export default useFirebaseUser;
