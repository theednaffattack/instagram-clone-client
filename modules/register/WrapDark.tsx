import React from "react";
import { Flex as FlexBase, Card as CardBase, Heading } from "rebass";
import styled from "styled-components";
import {
  background,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  backgroundRepeat,
  maxWidth,
  minHeight,
  space
} from "styled-system";

import IconBase from "react-geomicons";

const Flex = styled(FlexBase)`
  ${minHeight}

  background-color: rgba(0, 0, 0, 0.5);

  //   background-image: linear-gradient(
  //   0deg,
  //   rgba(210, 48, 120, 1) 6%,
  //   rgba(254, 97, 97, 1) 74%,
  //   rgba(255, 121, 85, 1) 100%
  // );
`;

const Icon = styled(IconBase)`
  ${space}
`;

const InnerFlex = styled(FlexBase)`
  ${minHeight}
  ${background}
  ${backgroundImage}
  ${backgroundSize}
  ${backgroundRepeat}
  ${backgroundPosition}
`;

export const ContentFlex = styled(FlexBase)`
  ${minHeight}
`;

const Card = styled(CardBase)`
  ${maxWidth}
`;

export const WrapDark = ({ children, heading }: any) => (
  <Flex minHeight="100vh">
    <InnerFlex
      backgroundImage="rgba(0,0,0,0.5)" // {`"${bgUrl}"`}
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
          px={4}
          pb={4}
          pt={4}
          borderRadius="10px"
          bg="rgb(242,242,242)"
          boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
        >
          <Icon fill="grey" name="close" />
          <ContentFlex
            flexDirection="column"
            width={1}
            mt={3}
            mb={4}
            alignItems="center"
          >
            <Heading
              width={1}
              mb={3}
              color="text"
              fontSize={[5]}
              fontFamily="montserrat"
            >
              {heading}
            </Heading>
            {children}
          </ContentFlex>
        </Card>
      </ContentFlex>
    </InnerFlex>
  </Flex>
);
