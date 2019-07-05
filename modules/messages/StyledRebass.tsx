import styled from "styled-components";
import {
  backgroundImage,
  borders,
  boxShadow,
  color,
  fontSize,
  height,
  maxHeight,
  minHeight,
  minWidth,
  position,
  space,
  width,
  top,
  right,
  bottom,
  left,
  zIndex
} from "styled-system";
import React from "react";
import {
  Box as BoxBase,
  Button,
  Card,
  Flex as FlexBase,
  Image,
  Heading,
  Text
} from "rebass";

import { MenuDots as MenuDotsBase } from "./MenuIcon";
import CustomIconBase from "./CustomIcon";
import CustomIconMicBase from "./CustomIconMic";

export { Button, Card, Image, Heading, Text };

export const AbBox = styled(BoxBase)`
${borders}
${position}
  ${top}
  ${right}
  ${bottom}
  ${left}
  ${zIndex}
`;

export const MyInput = styled.input`
  ${borders}
  ${color}
  ${fontSize}
  ${space}
  ${width}

& ::placeholder,
::-webkit-input-placeholder {
  color: ${props => props.theme.colors.chat_placeholder};
}
:-ms-input-placeholder {
  color: red;
}
`;

const MenuDots = styled(MenuDotsBase)`
  ${space}
`;

export const BigLi = styled.li`
  text-decoration: none;
  display: inline-block;
`;

export const IconMic = styled(CustomIconMicBase)`
  ${space}
`;

export const CustomIcon = styled(CustomIconBase)`
  ${space}
`;

export const MinButton = styled(Button)`
  ${minHeight}
  ${space}
`;

export const AbWrapper = styled(FlexBase)`
${borders}
${position}
${top}
${left}
${right}
${bottom}
${zIndex}
${backgroundImage}
`;

export const DotBase = (props: any) => (
  <svg className={props.className} viewBox="0 0 21 21">
    <path
      fillRule="evenodd"
      strokeWidth="2px"
      stroke="rgba(242, 242, 242, 1)"
      fill="rgb(244, 50, 127)"
      d="M10.500,7.166 C12.525,7.166 14.167,8.808 14.167,10.833 C14.167,12.858 12.525,14.500 10.500,14.500 C8.475,14.500 6.833,12.858 6.833,10.833 C6.833,8.808 8.475,7.166 10.500,7.166 Z"
    />
  </svg>
);

export const Dot = styled(DotBase)`
  ${position}
  ${top}
  ${right}
  ${bottom}
  ${left}
  ${zIndex}
`;

export const Flex = styled(FlexBase)`
${boxShadow}
  ${borders}
  ${position}
  ${minHeight}
  ${height}
`;

export const CoverFlex = styled(FlexBase)`
  ${borders}
  ${position}
  ${minHeight}
  ${top}
  ${right}
  ${bottom}
  ${left}
`;

export const Box = styled(BoxBase)`
  ${maxHeight}
  ${minHeight}
  ${minWidth}
  ${borders}
  ${position}
`;

export const ViewProps = (props: any) => {
  return (
    <pre>
      <Text color="white">{JSON.stringify(props, null, 2)}</Text>
    </pre>
  );
};

export const StyledHR = (props: any) => {
  const StyledHRMade = styled.hr`
    height: 3px;
    border: none;
    color: #000;
    background-color: rgba(255, 255, 255, 0.251);
    width: 100%;
    text-align: center;
    margin: 0 auto;
  `;
  return <StyledHRMade />;
};
