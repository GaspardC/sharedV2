import React, { useState } from "react";
import { BiSync } from "react-icons/bi";
import { ApolloQueryResult } from "@apollo/client";
import { usePrefersReducedMotion, IconButtonProps } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { IconButtonWithoutFocus } from ".";
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
const RefetchButton = ({
  refetch,
  callback,
  ...iconButtonProps
}: Omit<IconButtonProps, "aria-label"> & {
  callback?: any;
  refetch(
    variables?: Partial<{
      [key: string]: never;
    }>
  ): Promise<ApolloQueryResult<any>>;
}) => {
  const [refetching, setRefetching] = useState(false);
  const [flashSucess, setFlashSucess] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 1s linear`;
  return (
    <IconButtonWithoutFocus
      {...(refetching && { animation })}
      // mb={3}
      ml={3}
      aria-label="reload"
      icon={
        <BiSync
          color={!flashSucess ? "primary.700" : "tertiary.300"}
          style={{ fontSize: "1.4rem" }}
        />
      }
      variant="ghost"
      colorScheme={!flashSucess ? "primary" : "tertiary"}
      onClick={() => {
        setRefetching(true);
        refetch().finally(() => {
          setRefetching(false);
          setFlashSucess(true);
          setTimeout(() => {
            setFlashSucess(false);
          }, 600);
          if (typeof callback === "function") callback();
        });
      }}
      {...iconButtonProps}
    />
  );
};
export default RefetchButton;
