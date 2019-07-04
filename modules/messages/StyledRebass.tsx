import styled from "styled-components";
import {
  backgroundImage,
  borders,
  height,
  position,
  boxShadow,
  top,
  left,
  bottom,
  right,
  zIndex,
  minHeight
} from "styled-system";
import React from "react";
import {
  Box as BoxBase,
  Card,
  Flex as FlexBase,
  Image,
  Heading,
  Text
} from "rebass";

export { Card, Image, Heading, Text };

export const AbBox = styled(BoxBase)`
${borders}
${position}
  ${top}
  ${right}
  ${bottom}
  ${left}
  ${zIndex}
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
  ${borders}
  ${minHeight}
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
