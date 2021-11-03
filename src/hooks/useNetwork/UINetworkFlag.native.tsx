import React from "react";
import Text from "../../components/mobile/Texts";
import { Div } from "../../components/mobile/magnus/Div";

const UINetworkFlag = ({errorMessage = 'No internet connection'} : {errorMessage?}) => {
  return (
    <Div
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top={0}
      left={0}
      w={"100%"}
      h={50}
      bg={"yellow200"}
    >
      <Text>{errorMessage}</Text>
    </Div>
  );
};
export default UINetworkFlag;
