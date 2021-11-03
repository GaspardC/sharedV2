import { useEffect, useState } from "react";
import { getUniqueId } from "../utils/index";

const useUniqueId = () => {
  const [uniqueId, setUniqueId] = useState(``);
  useEffect(() => {
    setUniqueId(`${getUniqueId()}`);
  }, []);
  return uniqueId;
};

export default useUniqueId;
