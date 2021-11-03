import React, { useState } from "react";
import { Box, FlexProps } from "@chakra-ui/react";
import styled from "@emotion/styled/macro";
import { transition } from "@my-monorepo/shared-local/src";
import { Col } from "@my-monorepo/shared/src/components/web/base";
import { useDispatch } from "react-redux";
// import { logoutAction } from "src/config/redux/reducers/user/user.action";
import { useHistory, useLocation } from "react-router-dom";
import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  IoMdPerson,
  IoMdNotifications,
  IoMdPhonePortrait,
  IoMdHome,
} from "react-icons/io";
import RVS from "@my-monorepo/shared/src/ApolloClient/reactiveVariables";
// import { useWindowSize } from 'src/hooks/useWindowSize';
import useWindowDimensions from "@my-monorepo/shared/src/hooks/useWindowsDimensions";
import { CY_SIDE_NAV } from "./ids.test";
// import PAGE_ROUTES, {
//   AUTH_ROOT,
// } from "../../../../client-admin/src/config/constants/PagesRoutes";
import IconNav from "./components/IconNav";
import Logo from "./components/Logo";
//TODO: ADD in a specifc library
// const { HOME, LOGIN } = PAGE_ROUTES;

const INIT_MENU_ITEMS: {
  linkName: string;
  iconName?: string;
  routePath: string;
  bottom?: number;
}[] = [
  // { linkName: "Log out", iconName: "logout", routePath: LOGIN, bottom: 12 },
];

const SideNav = ({
  onLogout,
  logo,
  menuTabs = [],
}: {
  onLogout?;
  logo?;
  menuTabs?: typeof INIT_MENU_ITEMS;
}) => {
  const location = useLocation();
  const routerPath = location.pathname;
  const { isMobile, sideBarWidth } = useWindowDimensions();
  const [menus] = useState([...INIT_MENU_ITEMS, ...menuTabs]);

  const [isOpen, setOpenState] = useState(false);
  const [forceClose, setForceClose] = useState(false);
  // const dispatch = useDispatch();
  // const nav = useNavigate();
  const history = useHistory();

  const setOpen = (val, waitFor = 0) => {
    if (forceClose) return;
    setOpenState(val);
    setForceClose(true);
    setTimeout(() => {
      setForceClose(false);
    }, waitFor);
  };

  const navigate = (link) => {
    history.push(link);
    // if (link !== LOGIN) setOpen(false, 300);
  };
  //TODO: fix routerPath.includes(AUTH_ROOT);
  // const isAuthPage = routerPath.includes(AUTH_ROOT);
  // if (isAuthPage) return <></>;

  const logout = async () => {
    if (onLogout) onLogout();
    //logging out
    // dispatch(logoutAction());
  };

  const menuItemLogoutClicked = () => {
    RVS.amILoggedIn(false);
    logout();
    // window.location.assign(LOGIN);
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };
  const isReduced = isMobile && !isOpen;
  return (
    <SideBarContainer
      {...{ isOpen }}
      height={"100vh"}
      {...(isReduced && {
        borderRightRadius: "50%",
        h: sideBarWidth / 2,
        w: sideBarWidth / 2,
        p: 0,
        pr: 1,
      })}
      {...(!isReduced && { width: sideBarWidth, p: 4 })}
      align="center"
      bg="primary.600"
      position="fixed"
      left="0"
      data-cy={CY_SIDE_NAV}
    >
      {!isReduced && (
        <>
          <Logo
            logo={logo}
            onClick={() => {
              // navigate(HOME);
            }}
            me={null}
            isOpen={isOpen}
          />
          <Box height="4"></Box>
          {menus.map(({ routePath, ...otherProps }, key) => (
            <IconNav
              {...{ ...otherProps, isOpen, routePath }}
              key={key}
              // {...(routePath === LOGIN && { onClick: menuItemLogoutClicked })}
              selected={routerPath === routePath}
            />
          ))}
        </>
      )}

      <IconNav
        {...{
          nativeIcon: ArrowRightIcon,
          iconName: "arrow-right",
          key: "arrow-menu",
          isOpen,
          bottom: 2,
        }}
        {...(isReduced && { h: 1, bottom: -1 })}
        onClick={() => setOpen(!isOpen)}
        selected={isOpen}
      />
    </SideBarContainer>
  );
};
export default React.memo(SideNav);

{
  /* <MenuIcon onClick={() => setOpen(!isOpen)} {...{ isOpen }} /> */
}

const SideBarContainer = styled<React.FC<FlexProps & { isOpen: boolean }>>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ isOpen, ...otherProps }) => <Col {...otherProps} />
)`
  z-index: 100;
  ${transition};
  ${({ isOpen }) =>
    isOpen
      ? ` width: 16em;
align-items: flex-start;`
      : ""}
`;
