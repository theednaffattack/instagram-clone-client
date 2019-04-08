import React, { InputHTMLAttributes, DetailedHTMLProps } from "react";
import styled from "styled-components";
import { FieldProps } from "formik";
// import { Text } from "rebass";

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  padding: 0px;
  margin: 0px;
  box-sizing: border-box; 
  height: 16px;
  background: ${props => (props.checked ? "" : "papayawhip")};
  border-radius: 3px;
  border: ${props => (!props.checked ? "1px rgba(0,0,0,0.3) solid" : "")};
  transition: all 150ms;
  background-image:  ${props =>
    props.checked
      ? "linear-gradient(90deg, rgb(210,48,120) 6%, rgb(254,97,97) 74%, rgb(255,121,85) 100%);"
      : ""}

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 2.5px lawngreen;

  /* border: 1px lawngreen solid; */

  }

  ${Icon} {
    visibility: ${props => (props.checked ? "visible" : "hidden")};
  }
  
`;

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const CheckBox = ({ field, form, ...props }: FieldProps & InputProps) => (
  <CheckboxContainer>
    <HiddenCheckbox
      checked={form.values.keepMeSignedIn}
      name={field.name}
      onChange={() => {
        const nextValue = !form.values.keepMeSignedIn;

        form.setFieldValue("keepMeSignedIn", nextValue);
        console.log("view props stringified");
        console.log(JSON.stringify(props));
        console.log("view form");
        console.log(JSON.stringify(form, null, 2));
        console.log(JSON.stringify(field.value));
        console.log("view nextValue");
        console.log(nextValue);
      }}
      {...props}
    />
    <StyledCheckbox checked={form.values.keepMeSignedIn}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
      {/* <Text>{Object.keys(props)}</Text>
      <Text>{Object.keys(field)}</Text>
      {props.value}
      {field.value ? field.value : "undefined, I think"} */}
    </StyledCheckbox>
  </CheckboxContainer>
);

export { CheckBox };
