import { isEmpty } from "lodash";
import React from "react";
import { Platform, Dimensions } from "react-native";
import styledWeb from "styled-components";
import packageJson from "../../../../package.json";
// import styledNative from "styled-components/native";
import {
  BREAKPOINTS_W,
  DEVICES,
} from "../hooks/useWindowsDimensions/breakpoints";

export const isIos = () => Platform.OS === "ios";
export const isAndroid = () => Platform.OS === "android";
export const isDev = () =>
  isDevice() ? __DEV__ : process.env.NODE_ENV === "development";
export const isBrowser = () => typeof window !== "undefined";
export const isWeb = () => Platform.OS === "web";
export const isDevice = () =>
  Platform.OS === "android" || Platform.OS === "ios";
export const isServerSide = () => !isBrowser() && !isDevice();
export const noop = () => {};
// export const isCypress = () => isBrowser() && (window as any).Cypress

export const getPackageValue = (value: string) => {
  //@ts-ignore
  if (packageJson) return packageJson[value];
  return value;
};

const SERVER_SIDE_DEFAULT_WIDTH = 1000;
const dim = Dimensions.get(isDevice() ? "window" : "screen");
export const Metrics = {
  fullScreenHeight: isDevice() ? dim.height : "100vh",
  fullScreenWidth: isDevice() ? dim.width : "100vw",
  fullScreenHeightN: dim.height,
  fullScreenWidthN: dim.width,
  screenWidth: isServerSide()
    ? SERVER_SIDE_DEFAULT_WIDTH
    : !isDevice()
    ? window.innerWidth
    : dim.width,
  screenHeight: isServerSide()
    ? SERVER_SIDE_DEFAULT_WIDTH
    : !isDevice()
    ? window.innerHeight
    : dim.height,
};

export const queryString = (params: any) =>
  Object.keys(params)
    .map((key) => key + "=" + params[key])
    .join("&");

export const shortSentence = (str = "", maxLength = 200, upperFirst = true) => {
  let trimmedString = str.substr(0, maxLength);
  // re-trim if we are in the middle of a word
  // if one work only keep it else get last word meaning until last index of " "
  const indexLastSpace = trimmedString.lastIndexOf(" ");
  if (indexLastSpace !== -1) {
    trimmedString = trimmedString.substr(
      0,
      Math.min(trimmedString.length, indexLastSpace)
    );
  }
  return !upperFirst ? trimmedString : `${firstLetterUpper(trimmedString)}`;
};

export const firstLetterUpper = (str = "") =>
  `${str.charAt(0).toUpperCase()}${str.substring(1, str.length).toLowerCase()}`;
export const trimUslessSpaces = (str = "") =>
  str.replace(/  +/g, " ").replace(/^\s+/g, "");

export const hexToRGBA = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
};

export const copyObjectValuesInto = (objSrc = {}, objDest: any = {}) => {
  Object.entries(objSrc).forEach(([key, value]) => (objDest[key] = value));
};

export const getParamsFromStr = (url: string, key: string) => {
  const urlParams = new URLSearchParams(url);
  return urlParams.get(key);
};

//TODO: dirty workaround for tablet need to change the logic im modal to update the layout correctly
export const isMobileLayout = () =>
  isServerSide()
    ? 1000
    : Dimensions.get("window").width < BREAKPOINTS_W[DEVICES.MOBILE] ||
      (isDevice() &&
        Dimensions.get("window").width < BREAKPOINTS_W[DEVICES.TABLET]);

export function isJsonString(str: string) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
}

export const safelyParseJSON = (str = "") => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
};

export const noopPromise = () =>
  new Promise((resolve) => {
    resolve(true);
  });

// export const styled = isDevice() ? styledNative : styledWeb;

export const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export const getUniqueId = () => Math.floor(Math.random() * 100000000);

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */
export function getValidChildren(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) =>
    React.isValidElement(child)
  ) as React.ReactElement[];
}

const prefix0 = (num: number) => {
  if (!num) return "";
  if (num < 10) return `0${num}`;
  return `${num}`;
};

export const prefixWith0 = (num: number, maxLength = 3) => {
  if (num == 0) return `${new Array(maxLength).fill(0).join("")}`;
  if (!num || isNaN(num)) return "";

  let pow = 1;
  for (pow; pow < maxLength + 1; pow++) {
    if (num < Math.pow(10, pow)) {
      break;
    }
  }
  return `${new Array(Math.max(0, maxLength - pow)).fill("0").join("")}${num}`;
};
export const formatDate = (date: Date) => {
  try {
    return `${prefix0(date.getDate())}.${prefix0(
      date.getMonth()
    )}.${date.getFullYear()}`;
  } catch (e) {
    return "";
  }
};

export const formatHours = (date: Date) => {
  try {
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const min = minutes.toString().length === 1 ? `0${minutes}` : `${minutes}`;
    const h = hours.toString().length === 1 ? `0${hours}` : `${hours}`;
    return `${h}:${min}`;
  } catch (e) {
    return "";
  }
};

//year_month_date_hour_minute_second
export const formatDateLong = (dateArg: Date) => {
  try {
    const date = new Date(dateArg);
    return `${prefix0(date.getFullYear())}_${prefix0(
      date.getMonth()
    )}_${date.getDate()}_${prefix0(date.getHours())}_${prefix0(
      date.getMinutes()
    )}_${prefix0(date.getSeconds())}`;
  } catch (e) {
    console.log("prolem parisng date", e);
    return "";
  }
};
export const parseDate = (date = "") => {
  try {
    const [day, month, year] = date.split(".").map((s) => parseInt(s));
    return new Date(year, month, day);
  } catch (e) {
    return new Date();
  }
};

function delay(msec: number, value: any) {
  return new Promise((done) => setTimeout(() => done(value), msec));
}

export function isFinished(promise: Promise<any>) {
  return Promise.race([
    delay(0, false),
    promise.then(
      () => true,
      () => true
    ),
  ]);
}

export const isValidNumber = (val) =>
  !(val == null || isNaN(val) || val === "");

export const returnNumberValueSafeLargeNull = (
  val: any,
  defaultValue?: number
) => {
  const _defaultValue = defaultValue ?? 0;
  try {
    const _val = parseFloat(`${val}`);
    const isvalid = !isValidNumber(_val);
    return !isvalid ? _val : _defaultValue;
  } catch (e) {
    return _defaultValue;
  }
};

export const getEnumKeys = (myEnum) =>
  Object.values(myEnum).filter((val: any) => isNaN(val)) as string[];

export const getArray = (arr?: any[]) => {
  if (!arr || arr?.length === 0) return [];
  return arr;
};

export const getPhotosUri = (imageFiles?: any[]) =>
  imageFiles && imageFiles?.length > 0
    ? imageFiles.map(
        (imageFile) => `${process.env.REACT_APP_BACKEND_URL}${imageFile.url}`
      )
    : [];

export const isObjEmpty = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const splitArray = (arr: any[], weight: boolean) => {
  const numPart1 = Math.round(arr.length / 2);
  if (!weight) return [arr.slice(0, numPart1), arr.slice(numPart1)];

  const sumWeight = arr.reduce((acc, curr) => acc + curr.weight, 0);
  const arr1: any[] = [];
  const arr2: any[] = [];
  let countWeight: number = 0;
  arr.forEach((elem) => {
    if (countWeight + elem.weight <= Math.round(sumWeight / 2)) {
      arr1.push(elem);
      countWeight += elem.weight;
    } else {
      arr2.push(elem);
    }
  });
  return [arr1, arr2];
};

export const getDescriptionSafe = (description: any) => {
  if (typeof description === "string") return description;
  if (Array.isArray(description)) {
    if (typeof description[0] === "string") return description[0];
    if (typeof description[0]?.message === "string")
      return description[0]?.message;
    return "";
  }
  if (typeof description?.message === "string") return description?.message;
  console.log(description);
  return "une erreur a eu lieu";
};
