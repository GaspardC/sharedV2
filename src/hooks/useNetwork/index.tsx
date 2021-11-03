import React, { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import UINetworkFlag from "./UINetworkFlag";
import usePrev from "../usePrev";

const useNetworkFlag = (errorMessage?) => {
  const [networkIsConnected, setNetworkState] = useState<boolean | null>(null);
  const wasConnected = usePrev(networkIsConnected);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
      // const devStatus = false;
      const devStatus = state.isConnected!!;
      setNetworkState(__DEV__ ? devStatus : state.isConnected!!);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const UiFlag = () => {
    if (networkIsConnected) return null;
    return <UINetworkFlag errorMessage={errorMessage} />;
  };
  return { UiFlag, networkIsConnected, wasConnected };
};

export default useNetworkFlag;
