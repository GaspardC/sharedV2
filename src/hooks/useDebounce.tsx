import React, { useEffect, useRef } from "react";
import { debounce } from "lodash";
// T is a generic type for value parameter, our case this will be string
function useDebounce(vanillaFunction, delay = 500) {
  // State and setters for debounced value
  //   const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const debouncedFunction = useRef<any>(null);
  useEffect(
    () => {
      if (typeof vanillaFunction !== "function") return;
      debouncedFunction.current = debounce(vanillaFunction, delay);
    },
    [vanillaFunction, delay] // Only re-call effect if value or delay changes
  );
  return debouncedFunction.current;
}
export default useDebounce;
