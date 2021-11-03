import React, { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

const useFlashValue = ({
  param,
  flashDuration = 300
}: {
  param: any;
  flashDuration: number;
}) => {
  const [flash, setFlash] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    setFlash(true);
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: flashDuration,
      useNativeDriver: true
    }).start();

    setTimeout(() => {
      setFlash(false);
    }, flashDuration);
  }, [param]);
  return { flash, fadeAnim, setFlash };
};

export default useFlashValue;
