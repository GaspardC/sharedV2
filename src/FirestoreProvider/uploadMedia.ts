import "firebase/storage";
import { fuego } from "@my-monorepo/shared/src/FirestoreProvider";

const FIREBASE_IMAGES = "images/";

export const firebaseUploadFile = async (
  fileUri,
  fileType?,
  targetFolder = FIREBASE_IMAGES,
  fileName = `${new Date().getTime()}.jpg`
) => {
  const response = await fetch(fileUri);
  const blob = await response.blob();

  // Create a root reference
  const storageRef = fuego.storage().ref();

  // Create a reference to file
  const fileRef = storageRef.child(`${targetFolder}${fileName}`);

  try {
    const snapshot = await fileRef.put(blob, fileType);
    return snapshot.ref.getDownloadURL() as Promise<string>;
  } catch (error) {
    console.log(error);
  }
};

export const firebaseDeleteFile = (downloadURL: string) => {
  try {
    return fuego.storage().refFromURL(downloadURL).delete();
  } catch (error) {
    console.log(error);
  }
};

export const getDocnameFromUrl = (doc, baseFolder) => {
  try {
    return `${doc
      ?.split(baseFolder.replace("/", "%2F"))[1]
      ?.split("?alt=media")[0]
      .replace("%201", "")}`;
  } catch (e) {
    return "";
  }
};
