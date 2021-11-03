import React from "react";
import { Field as FormikField, useFormikContext } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Checkbox,
  Flex,
  Box
} from "@chakra-ui/react";

export type FieldProps = {
  name: string;
  label?: any;
  placeholder?: string;
  type?: string;
  otherProps?: any;
  checkbox?: boolean;
  onChange?: any;
  "data-cy"?: string;
};

const Field = ({
  name,
  label: labelProp,
  placeholder = "",
  type = "text",
  checkbox = false,
  onChange,
  "data-cy": dataCy,
  ...otherProps
}: FieldProps) => {
  const nameLc = name.toLowerCase().replace(/\s+/g, "");
  const label = labelProp ? labelProp : name;
  return (
    <Box my="2" {...otherProps} width="100%">
      <FormikField name={nameLc}>
        {({ field: fieldProp, form }) => {
          //set an empty value if undefined to prevent react input warning
          const field = {
            ...fieldProp,
            ...(!fieldProp.value && { value: "" })
          };
          //callback if exists
          // if (onChange) onChange(field.value)
          return (
            <FormControl
              isInvalid={form.errors[nameLc] && form.touched[nameLc]}
            >
              <FormLabel htmlFor={nameLc}>{checkbox ? "" : label}</FormLabel>
              {!checkbox && (
                <Input
                  {...field}
                  type={type}
                  id={nameLc}
                  placeholder={placeholder}
                  data-cy={dataCy}
                />
              )}
              {checkbox && (
                <CheckBoxWrapper
                  {...{ name: nameLc, label, isChecked: field.value === true }}
                />
              )}
              <FormErrorMessage>{form.errors[nameLc]}</FormErrorMessage>
            </FormControl>
          );
        }}
      </FormikField>
    </Box>
  );
};

export default Field;

const CheckBoxWrapper = ({ isChecked, name, label }) => {
  const { setFieldValue } = useFormikContext();
  return (
    <Flex justify="flex-start" my="4">
      <Checkbox
        defaultIsChecked={false}
        {...{
          colorScheme: "yellow",
          onChange: () => {
            setFieldValue(name, !isChecked);
          }
        }}
      >
        {label}
      </Checkbox>
    </Flex>
  );
};
