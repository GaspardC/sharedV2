import { transformFormat } from "@my-monorepo/shared/src/utils/date";
import toast from "@my-monorepo/shared/src/components/common/Toast";
import { cloneDeep } from "lodash";
import * as Apollo from "@apollo/client";
import { ThenArg } from "../types";

type OnSubmitProps = {
  keyObjToChange;
  update;
  onSuccess?;
  hideSuccessToast?: boolean;
  hideErrorToast?: boolean;
  extraArgs?: Apollo.MutationHookOptions;
  where?: any;
};

type OnCreateProps = {
  create;
  onSuccess?;
  hideSuccessToast?: boolean;
  hideErrorToast?: boolean;
  extraArgs?: Apollo.MutationHookOptions;
};

type OnDeleteProps = {
  keyObjToChange;
  deleteQuery;
  onSuccess?;
  extraArgs?: Apollo.MutationHookOptions;
};

export const successToast = (message = "Données sauvegardées avec succés") => {
  const title = "Sauvegarde réussie";
  toast({
    title,
    description: message,
    status: "success",
    duration: 3000,
    isClosable: true,
    position: "top",
  });
};

export const errorToast = (
  err,
  message = "La sauvegarde des données a échoué"
) => {
  console.log(err);
  toast({
    title: "Erreur",
    description: message,
    status: "error",
    duration: 3000,
    isClosable: true,
    position: "top",
  });
};

export const genericCall = async ({
  call,
  successMessage,
  errorMessage,
  onSuccess,
}: {
  call;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?;
}) => {
  try {
    if (call && typeof call === "function") await call();
    successToast(successMessage);
    if (onSuccess && typeof onSuccess === "function") await onSuccess();
  } catch (e) {
    errorToast(e, errorMessage);
  }
};

export function postUpdate<T extends (...args: any) => any>({
  keyObjToChange,
  update,
  onSuccess,
  extraArgs,
  where,
  hideSuccessToast = false,
  hideErrorToast = false,
}: OnSubmitProps): (values: any) => Promise<ReturnType<T>> {
  return async (values) => {
    try {
      const id = keyObjToChange.id;
      const res = await update({
        variables: {
          input: {
            where: where ?? { id },
            data: cleanDataBeforeSendingToStrapi(values, true),
          },
        },
        ...extraArgs,
      });
      successToast();
      onSuccess && onSuccess();
      return res;
    } catch (err) {
      return errorToast(
        toast,
        typeof err === "string" ? err : JSON.stringify(err)
      );
    }
  };
}
// ThenArg<ReturnType<T>>["data"]
export function postCreate<T extends (...args: any) => any>({
  create,
  onSuccess,
  hideSuccessToast = false,
  hideErrorToast = false,
  extraArgs,
}: OnCreateProps): (values: any) => Promise<ReturnType<T>> {
  return async (values) => {
    try {
      const res = await create({
        variables: {
          input: {
            data: cleanDataBeforeSendingToStrapi(values),
          },
        },
        ...extraArgs,
      });
      if (!hideSuccessToast) successToast();
      onSuccess && onSuccess(res?.data);
      return res;
    } catch (e) {
      if (!hideErrorToast) errorToast(e);
    }
  };
}

export const postDelete =
  ({ keyObjToChange, deleteQuery, onSuccess, extraArgs }: OnDeleteProps) =>
  () => {
    deleteQuery({
      variables: {
        input: {
          where: {
            id: keyObjToChange?.id,
          },
        },
      },
      ...extraArgs,
    })
      .then(() => {
        successToast("Supression sauvegardée");
        onSuccess && onSuccess();
      })
      .catch((err) => {
        errorToast(err);
      });
  };

export const cleanDataBeforeSendingToStrapi = (data: any, edit?: boolean) => {
  if (edit) delete data["id"];
  const newData = cloneDeep(data);
  return cleanData(newData);
};

const cleanData = (clonedData: any) => {
  delete clonedData["__typename"];
  delete clonedData["created_at"];
  delete clonedData["updated_at"];
  delete clonedData["localPhotoUris"];

  Object.entries(clonedData ?? {}).forEach(([key, val]: [string, any]) => {
    if (key.includes("date") && typeof val === "string") {
      clonedData[key] = transformFormat({ dateStr: val });
    }
    if (typeof val === "object" && val != null) {
      return cleanData(val);
    }
  });

  return clonedData;
};
