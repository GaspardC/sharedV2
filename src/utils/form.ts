import * as NativeYup from "yup";
import { fr } from "yup-locales";
import { simpleDateFormat } from "./date";
NativeYup.setLocale(fr);

function equalTo(ref: any, msg: any) {
  return NativeYup.mixed().test({
    name: "equalTo",
    exclusive: false,
    message: msg || "${path} must be the same as ${reference}",
    params: {
      reference: ref.path,
    },
    test(value: any) {
      return value === this.resolve(ref);
    },
  });
}
//@ts-ignore
NativeYup.addMethod(NativeYup.string, "equalTo", equalTo);

export const Yup = NativeYup;

export const YupValidateDate = Yup.string()
  .matches(/(\d{2}\.\d{2}\.\d{4})/, {
    message: `Date incorrecte, elle doit avoir le format suivant : ${simpleDateFormat(
      {}
    )}`,
  })
  .nullable();

export const YupValidateNumber = Yup.number()
  .nullable()
  .typeError("Doit être un chiffre.");

export const YupValidateStrictNumber = Yup.number()
  .required("")
  .typeError("Doit être un chiffre.");

export const YupValidateString = Yup.string()
  .nullable()
  .typeError("Doit être du texte.");

export const YupValidateStrictString = Yup.string()
  .required("Champ obligatoire")
  .typeError("Doit être du texte.");

export const YupValidateEmail = Yup.string()
  .email()
  .nullable()
  .typeError("Doit être du email.");

export const YupValidateStrictEmail = Yup.string()
  .email()
  .required("Entrer un email")
  .typeError("Doit être du email.");
