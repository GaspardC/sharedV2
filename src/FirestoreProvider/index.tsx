import React from "react";
import "expo-firestore-offline-persistence";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";
import { FuegoProvider } from "@nandorojo/swr-firestore";
import { isDev, isAndroid } from "@my-monorepo/shared/src/utils/index";
import Constants from "expo-constants";
import { Fuego } from "./fuego";

export let fuego: Fuego;
export const initializeFirebase = (firebaseConfig) => {
  fuego = new Fuego(firebaseConfig);
  fuego.db
    .enablePersistence()
    .then(() => {
      console.log("firestore persistence enabled");
    })
    .catch((e) => {
      console.log("firestore persistence failed", e);
    });
  // if (isDev()) { //not working on android
  //   console.log("Switching to local Firebase instance...");
  //   const origin =
  //     Constants.manifest.debuggerHost?.split(":").shift() || "localhost";

  //   fuego.app.functions().useEmulator(origin, 5001);
  // }
  return fuego;
};

export default function FirestoreProvider({ children }) {
  if (!fuego) {
    console.log(
      "Firebase not initalized, please initalize Firebase before using it"
    );
    return <>{children}</>;
  }
  return <FuegoProvider fuego={fuego}>{children}</FuegoProvider>;
}

// export const useInitFirebase = (firebaseConfig) => {
//   const [fuegoInit, setInit] = useState();
//   useEffect(() => {
//     const fuego = initializeFirebase(firebaseConfig);
//     setInit(fuego);
//     // firebase.default.analytics();
//   }, []);
//   return { fuegoInit };
// };
