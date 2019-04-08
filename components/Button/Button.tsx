import * as React from "react";
import { Button as MyButton, ButtonProps, Text } from "rebass";
import styled from "styled-components";
import { borderRadius, boxShadow } from "styled-system";

export interface Props extends ButtonProps {
  // what the button will read
  label: string;

  // click action
  onClick: () => void;

  // is it disabled, default is false
  disabled?: boolean;

  shadow?: string;
}

const StyledButton = styled(MyButton)`
  ${boxShadow}
  ${borderRadius}

  :focus {
    border: 4px lawngreen solid;
    border-radius: 20px;
    outline: none;
  }

  background-image: linear-gradient(
    0deg,
    rgb(210, 48, 120) 6%,
    rgb(254, 97, 97) 74%,
    rgb(255, 121, 85) 100%
  );
`;

// ts-lint disable
const noop = () => {};

export const Button = (props: Props) => {
  const {
    bg,
    children,
    disabled = false,
    label,
    mt,
    mb,
    onClick,
    shadow,
    ...theRest
  } = props;
  const disabledclass = disabled ? "Button_disabled" : "";

  return (
    <StyledButton
      type="button"
      width="250px"
      mt={mt}
      bg={bg}
      borderRadius="23px"
      onClick={onClick}
      boxShadow="0px 10px 27px 0px rgba(0, 0, 0, 0.1)"
    >
      <Text fontFamily="montserrat">{label ? label : children}</Text>
    </StyledButton>
  );
};
