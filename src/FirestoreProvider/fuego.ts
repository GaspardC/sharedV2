import firebase from "firebase/app";

type Config = Parameters<typeof firebase.initializeApp>[0];

export class Fuego {
  public db: ReturnType<firebase.app.App["firestore"]>;
  public auth: typeof firebase.auth;
  public functions: typeof firebase.functions;
  public storage: typeof firebase.storage;
  public app: firebase.app.App;
  public firebase: typeof firebase;
  constructor(config: Config) {
    this.firebase = firebase;
    this.app = !firebase.apps.length
      ? firebase.initializeApp(config)
      : firebase.app();
    this.db = !firebase.apps.length
      ? this.app.firestore()
      : this.app.firestore();
    this.auth = firebase.auth;
    this.functions = firebase.functions;
    this.storage = firebase.storage;
  }
}
