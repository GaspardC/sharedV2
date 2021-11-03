import React from "react";
import { SpaceTypes } from "@my-monorepo/shared-local/src/theme/mobile";
import { DivProps } from "react-native-magnus";
import { getValidChildren } from "@my-monorepo/shared/src/utils";
import { Div } from "../magnus/Div";

type StackProps = DivProps & { spacing?: SpaceTypes; children?: any };

const Stack = ({ spacing = "sm", ...props }: StackProps) => {
  const validChildren = getValidChildren(props.children);
  return (
    <Div flexDir="column" {...props}>
      {validChildren.map((child, key) => {
        return <Div {...{ key, my: spacing }}>{child}</Div>;
      })}
    </Div>
  );
};
export default Stack;
