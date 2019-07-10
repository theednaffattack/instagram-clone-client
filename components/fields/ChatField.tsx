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

import { MyInput } from "../../modules/messages/StyledRebass";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const ChatInput = styled.input`
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

  ::placeholder {
    color: #3f3c62; // #b2b2d8;
  }
`;

export const ChatField = ({
  field,
  form: { errors, touched },
  onChange,
  ...props
}: FieldProps & InputProps) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <>
      {/* <Text fontFamily="montserrat">
        <label htmlFor={field.name}>{props.label}</label>
      </Text> */}
      <ChatInput
        id={field && field.id ? field.id : field.name}
        name={field.name}
        fontSize={1}
        width={1}
        // bg="rgba(0,0,0,0.1)"
        color="text"
        borderRadius={0}
        p={2}
        pl={3}
        my={2}
        letterSpacing=".1em"
        {...field}
        onChange={onChange}
        {...props}
      />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </>
  );
};
