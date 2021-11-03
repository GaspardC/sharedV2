import firebase from "firebase/app";
import "firebase/auth";
export type UserPropsFirebase =
  | (Pick<firebase.User, "email" | "displayName" | "uid"> & { jwt?: string })
  | null;
