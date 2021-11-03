/** @jsxRuntime classic */
/** @jsx jsx */
/* @jsxFrag React.Fragment */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx, css } from "@emotion/react";
import React, { useState } from "react";
import { Formik } from "formik";
import { OutlineButton } from "@my-monorepo/shared/src/components/web/button";
import { Yup } from "@my-monorepo/shared/src/utils/form";
import Field, { FieldProps } from "./field";
import Terms from "../terms/index";
// import { useDispatch } from "react-redux";
// import { actionDisplayToast } from "src/config/redux/reducers/toast/action";

const STEP_1 = {
  initState: { email: "", firstname: "", name: "" },
  fields: [
    { name: "Email", placeholder: "" },
    { name: "Firstname" },
    { name: "Name" },
  ],
  validationSchema: Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Please enter an email"),
    firstname: Yup.string()
      .min(2, "Must be at least 2 characters")
      .required("Firstname required"),
    name: Yup.string()
      .min(2, "Must be at least 2 characters")
      .required("Name required"),
  }),
};

const STEP_2 = {
  initState: { password: "", passwordbis: "", terms: false },
  fields: [
    { name: "Password", placeholder: "Your password", type: "password" },
    {
      name: "Passwordbis",
      label: "Password",
      placeholder: "Repeat the password",
      type: "password",
    },
    { name: "Terms", label: <Terms />, checkbox: true },
  ],
  validationSchema: Yup.object({
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Password required"),
    passwordbis: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Required"),
    terms: Yup.boolean()
      .oneOf([true], "The terms and conditions must be accepted.")
      .required("Please enter an email"),
  }),
};

const SignupForm = () => {
  const [isStep_1, setIsStep_1] = useState(true);
  const [, setForm_1] = useState(STEP_1.initState);
  // const router = useRouter();
  // const dispatch = useDispatch();
  const { initState, validationSchema, fields } = isStep_1 ? STEP_1 : STEP_2;

  return (
    <Formik
      initialValues={initState}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log("submitting form", values);
        if (isStep_1) {
          actions.setSubmitting(false);
          setForm_1(values as typeof STEP_1.initState);
          setIsStep_1(false);
        } else {
          // const res = { ...form_1, ...values };
          //TODO wire API when available
          setTimeout(() => {
            actions.setSubmitting(false);
            // router.push(PAGE_ROUTES.HOME)
            //TODO redirect
            // dispatch(
            //   actionDisplayToast({
            //     title: "Account created.",
            //     description: "We've created your account.",
            //     status: "success"
            //   })
            // );
          }, 1000);
        }
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <FormFields {...{ fields }} />
          <OutlineButton
            width="100%"
            mt={4}
            isLoading={isSubmitting}
            type="submit"
          >
            {`${isStep_1 ? "Next" : "Continue"}`}
          </OutlineButton>
        </form>
      )}
    </Formik>
  );
};

type FormFieldsProps = {
  fields: FieldProps[];
};
export const FormFields = ({ fields }: FormFieldsProps) => (
  <>
    {fields.map((fieldProps, index) => (
      <Field key={index} {...fieldProps} />
    ))}
  </>
);

export default SignupForm;
