import { Field, Formik } from "formik";
import React from "react";
import {
  Button as ButtonBase,
  Flex as FlexBase,
  Text,
  Card as CardBase,
  Heading,
  Box
} from "rebass";
import styled from "styled-components";
import {
  background,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  backgroundRepeat,
  boxShadow,
  borderRadius,
  minHeight,
  maxWidth
} from "styled-system";
import { url } from "inspector";
import { SignInFooter } from "./SignInFooter/SignInFooter";

const Button = styled(ButtonBase)`
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

const Flex = styled(FlexBase)`
  ${minHeight}

  background-image: linear-gradient(
  0deg,
  rgba(210, 48, 120, 1) 6%,
  rgba(254, 97, 97, 1) 74%,
  rgba(255, 121, 85, 1) 100%
);
`;

const InnerFlex = styled(FlexBase)`
  ${minHeight}
  ${background}
  ${backgroundImage}
  ${backgroundSize}
  ${backgroundRepeat}
  ${backgroundPosition}
//   background: url(${props => props.url})} center center no-repeat;
//   background-size: cover;
`;

export const ContentFlex = styled(FlexBase)`
  ${minHeight}
`;

const Card = styled(CardBase)`
  ${maxWidth}
`;

const bgUrl = "/static/images/login/bg.png";

export const Wrap = ({ children, heading }: any) => (
  <Flex minHeight="100vh">
    <InnerFlex
      backgroundImage="url(/static/images/login/bg.png)" // {`"${bgUrl}"`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      width={[1]}
      minHeight="100vh"
    >
      <ContentFlex
        mt={[0, 5, 0]}
        flexDirection="column"
        width={[1]}
        justifyContent="center"
        alignItems="center"
      >
        <Card
          mx={3}
          width={1}
          maxWidth={["350px", "350px"]}
          p={4}
          borderRadius="10px"
          bg="rgb(242,242,242)"
          boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
        >
          <ContentFlex
            flexDirection="column"
            width={1}
            mt={3}
            mb={4}
            alignItems="center"
            justifyContent="center"
          >
            <Heading mb={3} color="text" fontSize={[5]} fontFamily="montserrat">
              {heading}
            </Heading>
            {children}
          </ContentFlex>
        </Card>

        <SignInFooter maxWidth="300px" />
      </ContentFlex>
    </InnerFlex>
  </Flex>
);
