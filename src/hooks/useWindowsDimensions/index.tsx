import { useEffect, useState } from "react";
import { Metrics } from "@my-monorepo/shared/src/utils";
import { BREAKPOINTS_W, DEVICES } from "./breakpoints";
import { isWeb } from "../../utils/index";

const DEFAULT_SZE = 1200;
const SIDE_NAV_WIDTH_CLOSE = 16; // in rem unit

export const isDesktop = (type) => type === DEVICES.DESKTOP;
export const isTablet = (type) => type === DEVICES.TABLET;
export const isMobile = (type) =>
  type === DEVICES.MOBILE || type === DEVICES.SMALL_MOBILE;
export const isSmallMobile = (type) => type === DEVICES.SMALL_MOBILE;

/**
 * @param type device
 * @param sizes array of sizes 0 for mobile, 1 for tablet and 2 for desktop
 */

export const getSize = (type: DEVICES, sizes: any[]) => {
  switch (type) {
    case DEVICES.MOBILE:
      return sizes[0];
    case DEVICES.TABLET:
      return sizes[1];
    case DEVICES.DESKTOP:
      return sizes[2];
    case DEVICES.SMALL_MOBILE:
      return sizes[3];
  }
};

function useWindowSize() {
  const isClient = typeof window === "object";

  function getScreenSize() {
    const width = isWeb()
      ? isClient
        ? window.innerWidth
        : DEFAULT_SZE
      : Metrics.screenWidth;
    const height = isWeb()
      ? isClient
        ? window.innerHeight
        : DEFAULT_SZE
      : Metrics.screenHeight;

    let type = DEVICES.DESKTOP;
    if (width <= BREAKPOINTS_W[DEVICES.SMALL_MOBILE]) {
      type = DEVICES.SMALL_MOBILE;
    } else if (width < BREAKPOINTS_W[DEVICES.MOBILE]) {
      type = DEVICES.MOBILE;
    } else if (width < BREAKPOINTS_W[DEVICES.TABLET]) {
      type = DEVICES.TABLET;
    }

    const isMobileR = isMobile(type);
    const sideBarWidth = isMobileR ? 0 : SIDE_NAV_WIDTH_CLOSE;

    return {
      width,
      height,
      isPortrait: width < height,
      type,
      isMobile: isMobile(type),
      isSmallMobile: isSmallMobile(type),
      isTablet: isTablet(type),
      isDesktop: isDesktop(type),
      withoutSideBar: width - sideBarWidth * 8,
      sideBarWidth,
    };
  }

  const [windowSize, setWindowSize] = useState(getScreenSize);

  //@ts-ignore
  useEffect(() => {
    if (!isClient || !isWeb()) return;
    function handleResize() {
      // console.log('RESIZE')
      setWindowSize(getScreenSize());
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export default useWindowSize;
