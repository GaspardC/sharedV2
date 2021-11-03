import * as SentryExpo from "sentry-expo";

const initSentry = (dsn = "") => {
  if (!dsn || dsn === "") return;
  SentryExpo.init({
    dsn,
  });
};
export default initSentry;
