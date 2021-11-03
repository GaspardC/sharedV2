// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { css } from "@emotion/react";
import React from "react";
import { Formik, FormikConfig } from "formik";
import { OutlineButton } from "@my-monorepo/shared/src/components/web/button";
import Field from "@my-monorepo/shared/src/components/web/form/field";
import * as Yup from "yup";
import { CY_LOGIN_EMAIL, CY_LOGIN_PASSWORD, CY_LOGIN_BTN } from "./id.test";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("L'email n'est pas correct")
    .required("Ce champ est obligatoire"),
  password: Yup.string()
    .min(6, "Votre mot de passe doit comprendre au moins 6 lettres")
    .required("Ce champ est obligatoire"),
});

const LoginForm = ({
  onSubmit,
}: {
  onSubmit: FormikConfig<{ email: string; password: string }>["onSubmit"];
}) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(props) => (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
          onSubmit={props.handleSubmit}
        >
          <Field
            name="Email"
            placeholder="Votre email"
            data-cy={CY_LOGIN_EMAIL}
          ></Field>
          <Field
            name="Password"
            label="Mot de passe"
            placeholder="Votre mot de passe"
            type="password"
            data-cy={CY_LOGIN_PASSWORD}
          ></Field>
          <OutlineButton
            data-cy={CY_LOGIN_BTN}
            // width="100%"
            mt={4}
            isLoading={props.isSubmitting}
            type="submit"
          >
            Se connecter
          </OutlineButton>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
