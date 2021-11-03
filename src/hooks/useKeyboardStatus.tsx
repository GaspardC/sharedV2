import React, { useState, useEffect, useRef } from "react";
import { Keyboard, EmitterSubscription } from "react-native";

/**
 * Returns if the keyboard is open / closed
 *
 * @return {bool} isOpen
 */
function useKeyboardStatus() {
  const [isOpen, setIsOpen] = useState(false);
  const keyboardShowListener = useRef<EmitterSubscription | null>(null);
  const keyboardHideListener = useRef<EmitterSubscription | null>(null);

  useEffect(() => {
    keyboardShowListener.current = Keyboard.addListener("keyboardDidShow", () =>
      setIsOpen(true)
    );
    keyboardHideListener.current = Keyboard.addListener("keyboardDidHide", () =>
      setIsOpen(false)
    );

    return () => {
      keyboardShowListener.current?.remove();
      keyboardHideListener.current?.remove();
    };
  }, []);

  return isOpen;
}
export default useKeyboardStatus;
