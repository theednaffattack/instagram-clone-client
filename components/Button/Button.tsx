import * as React from "react";
import { Button as MyButton, ButtonProps } from "rebass";
import styled from "styled-components";
import { boxShadow } from "styled-system";

export interface Props extends ButtonProps {
  // what the button will read
  label: string;

  // click action
  onClick: () => void;

  // is it disabled, default is false
  disabled?: boolean;
}

const StyledButton = styled(MyButton)`
  ${boxShadow}
`;
// ts-lint disable
const noop = () => {};

export const Button = (props: Props) => {
  const { bg, children, disabled = false, label, onClick, shadow } = props;
  const disabledclass = disabled ? "Button_disabled" : "";

  return (
    <StyledButton
      width="250px"
      bg={bg}
      border="2px rgba(255,255,255,0.3) solid"
      borderRadius="23px"
      onClick={onClick}
      boxShadow={shadow}
    >
      {label ? label : children}
    </StyledButton>
  );
};
