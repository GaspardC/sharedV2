import { createStandaloneToast, UseToastOptions } from "@chakra-ui/react";
import { theme } from "@my-monorepo/shared-local/src/theme/mobile";
import { getDescriptionSafe } from "../../../utils";

const toastNative = createStandaloneToast({ theme });

const toast = (toastData?: UseToastOptions) =>
  toastNative({
    title: "An error occurred.",
    status: "error",
    duration: 9000,
    isClosable: true,
    ...toastData,
    description: getDescriptionSafe(
      toastData?.description ?? "Unable to create user account."
    ),
  });
export default toast;
