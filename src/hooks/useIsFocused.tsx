import React, { useState, useCallback } from "react";
import { useFocusEffect } from "expo-next-react-navigation";

const useIsFocused = () => {
  const [isFocused, setIsFocused] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);

      return () => {
        setIsFocused(false);
      };
    }, [])
  );
  return isFocused;
};
export default useIsFocused;
