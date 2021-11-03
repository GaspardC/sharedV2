import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { isDev } from "../utils";

const initSentry = (dsn) => {
  if (!dsn || dsn === "") return;
  console.log("sentry init test new from monorepo test");
  Sentry.init({
    dsn,
    integrations: [new Integrations.BrowserTracing()],
    environment: isDev() ? "development" : "production",
    tracesSampleRate: 1.0
  });
};
export default initSentry;
