import React from "react";
import { Flex, FlexProps, Box } from "@chakra-ui/react";
import { theme } from "@my-monorepo/shared-local/src/theme/mobile";
import useWindowsDimensions from "../../../hooks/useWindowsDimensions";

export type PageContainerProps = FlexProps & {
  children: any;
  SideNav;
  "data-cy"?: string;
};
const PageContainer = (
  { children, "data-cy": dataCy, SideNav, ...otherProps }: PageContainerProps,
  ref
) => {
  const windowSize = useWindowsDimensions();
  const { isMobile, sideBarWidth } = windowSize;
  return (
    <Flex
      ref={ref}
      // bg="grey.100"
      bg={theme?.colors?.background ?? "grey.100"}
      h="100%"
      minH="100vh"
      justify="center"
      maxW="100%"
      ml={sideBarWidth}
      {...(dataCy && {
        "data-cy": `page-container-${dataCy?.replace("/", "")}`,
      })}
      {...otherProps}
    >
      {SideNav ? <SideNav /> : null}

      <Box
        p={5}
        {...(isMobile && { position: "absolute", left: 0, top: 0 })}
        bg={theme.colors.background}
        w="100%"
      >
        {children}
      </Box>
    </Flex>
  );
};
export default React.forwardRef(PageContainer);
