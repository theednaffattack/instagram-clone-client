import { FieldProps } from "formik";
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  CSSProperties
} from "react";
import { Text } from "rebass";
import styled from "styled-components";
import {
  backgroundImage,
  borders,
  borderRadius,
  color,
  space,
  width,
  height,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing
} from "styled-system";

import { hideVisually } from "polished";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const css = {
  margin: "0 0 10px 0",
  border: "0",
  padding: "8px 8px 8px 8px",
  display: "inline-block",
  verticalAlign: "middle",
  whiteSpace: "normal",
  background: "none",
  lineHeight: "1",
  width: "100%",
  boxSizing: "border-box",
  placeholder: {
    /* Firefox 18- */
    color: "pink"
  },

  fontSize: "13px",
  fontFamily: "montserrat",

  borderBottom: "4px rgba(244, 50, 127, 1) solid"

  // button:focus { color: "red" },
  // button:active { font-weight: bold; }
};

// ${color}
// ${backgroundImage}
// ${borderRadius}
// ${borders}
// ${space}
// ${width}
// ${height}
// ${fontFamily}
// ${fontSize}
// ${fontWeight}
// ${letterSpacing}

const Checkbox = props => <input type="checkbox" {...props} />;

const CheckBoxInput = styled.input.attrs({ type: "checkbox" })`
  ${hideVisually()}
  box-sizing:border-box
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  display: none;
  visibility: hidden;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${props => (props.checked ? "salmon" : "papayawhip")}
  border-radius: 3px;
  border: "2px red solid"
  transition: all 150ms;
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }
  ${Icon} {
    visibility: ${props => (props.checked ? "visible" : "hidden")}
  }
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const CheckboxWrapper = ({ className, checked, ...props }: any) => (
  <CheckboxContainer className={className}>
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
    <HiddenCheckbox checked={checked} {...props} />
  </CheckboxContainer>
);

export const CheckBox = ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & InputProps) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <>
      {field.label ? (
        <Text fontFamily="montserrat">
          <label htmlFor={field.name}>{field.name}</label>
        </Text>
      ) : (
        ""
      )}
      {/* <CheckBoxInput
        id={field && field.id ? field.id : field.name}
        name={field.name}
        fontSize={1}
        width="20px"
        height="20px"
        bg="rgba(0,0,0,0.1)"
        color="text"
        p={2}
        mt={2}
        mb={3}
        letterSpacing=".1em"
        border="0"
        borderRadius={2}
        backgroundImage="linear-gradient( 90deg, rgb(210,48,120) 6%, rgb(254,97,97) 74%, rgb(255,121,85) 100%);"
        {...field}
        {...props}
      /> */}
      <CheckboxWrapper />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </>
  );
};
