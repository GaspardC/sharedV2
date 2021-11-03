import React, { useEffect, useState } from "react";
import { ReactiveVar, makeVar } from "@apollo/client";
import { getItem, setItem } from "../utils/storage/utilStorage";
import storage from "../utils/storage/storage";
import { UserProps } from "../utils/auth";
import { UserPropsFirebase } from "../utils/authFirebase";

const currentUser: ReactiveVar<UserProps | null> = makeVar<UserProps | null>(
  null
);
const currentUserFirebase: ReactiveVar<UserPropsFirebase | null> =
  makeVar<UserPropsFirebase | null>(null);

const amILoggedIn: ReactiveVar<boolean> = makeVar<boolean>(false);

/** To add a reactive variable simply create one like above and add it to the below object RVS_*/

export const SHARED_RVS_ = { currentUser, amILoggedIn, currentUserFirebase };

export const sharedTypePolicy = {
  currentUser: {
    read() {
      return currentUser();
    },
  },
  currentUserFirebase: {
    read() {
      return currentUserFirebase();
    },
  },
  amILoggedIn: {
    read() {
      return amILoggedIn();
    },
  },
};

export const SHARED_RVS = getRVS<typeof SHARED_RVS_>(SHARED_RVS_);
export function getRVS<T>(rvsparam: T) {
  return Object.entries(rvsparam).reduce(
    (acc, [rvsKey, rvs]: [string, Function]) => {
      acc[rvsKey] = (params?: any) => {
        if (params === undefined && typeof rvs === "function") return rvs();
        const newData =
          params === null
            ? null
            : Array.isArray(params)
            ? params
            : { ...rvs(), ...params };
        rvs(newData);
        setItem(rvsKey, newData);
      };
      return acc;
    },
    {} as T
  );
}
export default SHARED_RVS;

export type RvsAnyType = {
  [key: string]: ReactiveVar<any>;
};
const hydrateReactiveVariables = async (rvsparam?: RvsAnyType) => {
  return await Promise.all(
    Object.entries({ ...SHARED_RVS, ...rvsparam }).map(
      async ([rvsKey, rvs]) => {
        const value = await getItem(rvsKey);
        if (rvs && typeof rvs === "function") {
          rvs(value);
        }
      }
    )
  );
};

export const RvsLogout = () => {
  storage.clear();
  SHARED_RVS.currentUser(null);
  SHARED_RVS.currentUserFirebase(null);
};

export const useRehydrateReactiveVariables = (rvsparam?: RvsAnyType) => {
  const [reloaded, setReloaded] = useState(false);
  useEffect(() => {
    hydrateReactiveVariables(rvsparam)
      .then(() => {
        setReloaded(true);
      })
      .catch((e) => {
        console.log("error reloading reactive variables from cache", e);
      });
  }, []);

  return reloaded;
};

export const checkRVSIntegrity = (typePolicy, RVS) => {
  Object.keys(RVS).forEach((key) => {
    if (!RVS[key]) throw "typePolicy and RVS must have the keys";
  });
};
