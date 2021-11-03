/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useEffect } from "react";
import { Formik } from "formik";
import { OutlineButton } from "@my-monorepo/shared/src/components/web/button";
import Field from "@my-monorepo/shared/src/components/web/form/field";
import { Yup } from "@my-monorepo/shared/src/utils/form";
import {
  CY_PROFILE_BTN_UPDATEP,
  CY_PROFILE_P,
  CY_PROFILE_NEWP,
  CY_PROFILE_NEWP_2,
  CY_PROFILE_FORM_PASSWORD,
} from "./id.test";
// import { RootState } from "src/config/redux/reducers";

const PasswordForm = ({ cancelCallback }: { cancelCallback?: any }) => {
  // const { first_name, last_name, email, update_password }: UserProps =
  //   useSelector((state: RootState) => state.userReducer);
  // const dispatch = useDispatch();

  const closeInnerCallBack = () => {
    // dispatch(actionUpdateUser({ local: true, update_password: "init" }));
    cancelCallback();
  };
  // useEffect(() => {
  //   if (update_password === "success") {
  //     closeInnerCallBack();
  //   }
  // }, [update_password]);

  return (
    <Formik
      initialValues={{
        password_current: "",
        password: "",
        password_repeat: "",
      }}
      validationSchema={Yup.object({
        password_current: Yup.string()
          .min(6, "Must be at least 6 characters")
          .required("Password required"),
        password: Yup.string()
          .min(6, "Must be at least 6 characters")
          .required("Password required"),
        password_repeat: Yup.string()
          .oneOf([Yup.ref("password"), undefined], "Passwords must match")
          .required("Required"),
      })}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        // const data = { ...values, first_name, last_name, email };
        // console.log(data);
        // dispatch(
        //   actionUpdateUser({
        //     ...data,
        //     local: false,
        //     update_password: "pending"
        //   })
        // );
      }}
    >
      {(props) => (
        <form
          css={css`
            width: 100%;
          `}
          onSubmit={props.handleSubmit}
          data-cy={CY_PROFILE_FORM_PASSWORD}
        >
          <Field
            label="Current password"
            name="password_current"
            placeholder="Your current password"
            type="password"
            data-cy={CY_PROFILE_P}
          ></Field>
          <Field
            label="New password"
            name="password"
            placeholder="Your new password"
            type="password"
            data-cy={CY_PROFILE_NEWP}
          ></Field>
          <Field
            label="Repeat new password"
            name="password_repeat"
            placeholder="Repeat your new password"
            type="password"
            data-cy={CY_PROFILE_NEWP_2}
          ></Field>

          <OutlineButton
            data-cy={CY_PROFILE_BTN_UPDATEP}
            width="100%"
            mt={4}
            isLoading={props.isSubmitting}
            type="submit"
          >
            Update
          </OutlineButton>
          {cancelCallback && (
            <OutlineButton
              color="accent.300"
              width="100%"
              mt={4}
              onClick={closeInnerCallBack}
            >
              Cancel
            </OutlineButton>
          )}
        </form>
      )}
    </Formik>
  );
};

export default PasswordForm;
