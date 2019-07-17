import { FieldProps } from "formik";
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  CSSProperties
} from "react";
import { Text } from "rebass";
import styled from "styled-components";
import {
  color,
  borders,
  space,
  width,
  height,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  borderRadius
} from "styled-system";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const InputB = styled.input`
${color}
${borders}
${space}
${width}
${height}
${borderRadius}
${fontFamily}
${fontSize}
${fontWeight}
${letterSpacing}
outline: none;
box-sizing:border-box;
transition: all 0.30s ease-in-out;
box-sizing: border-box;
/* border-left: 2.5px transparent solid;
border-right: 2.5px transparent solid; */
:focus {
  border-bottom: 2.5px lawngreen solid;
  // box-shadow: 0 1px 1px rgba(229, 103, 23, 0.075) inset, 0 0 8px rgba(229, 103, 23, 0.6);
  
}
  ::placeholder {
    color: palevioletred;
  }
`;

export const FileUploadField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & InputProps) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <>
      <Text fontFamily="montserrat">
        <label htmlFor={field.name}>{props.label}</label>
      </Text>
      <InputB
        id={field && field.id ? field.id : field.name}
        name={field.name}
        fontSize={1}
        width={1}
        bg="rgba(0,0,0,0.1)"
        color="text"
        borderRadius={0}
        p={2}
        mt={2}
        mb={3}
        letterSpacing=".1em"
        border="0"
        borderBottom="2.5px rgba(244, 50, 127, 1) solid"
        {...field}
        {...props}
      />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </>
  );
};
