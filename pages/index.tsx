// import Link from "next/link";
import * as React from "react";
import Layout from "../components/Layout";
import { LoginComponent } from "../generated/apolloComponents";
import { Box, Flex as FlexBase, Text } from "rebass";
import styled from "styled-components";
import { minHeight, space, width } from "styled-system";

import { Button } from "../components/Button/Button";

import CatBase from "../static/images/blissful2.svg";

const Cat = styled(CatBase)`
  ${space}
  ${width}
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
  background: url('/static/bg.png') center center no-repeat;
  background-size: cover;
`;

const ContentFlex = styled(FlexBase)`
  ${minHeight}
`;

// const Card = styled(CardBase)`
//   ${minHeight}

//   &:after {
//     content: "";
//     position: absolute;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     background-image: linear-gradient(
//       75deg,
//       rgb(210, 48, 120) 6%,
//       rgb(254, 97, 97) 74%,
//       rgb(255, 121, 85) 100%
//     );
//     opacity: 0.6;
//   }
// `;

const IndexPage: React.FunctionComponent = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      {/* <Card
        p={4}
        py={6}
        backgroundImage="url(https://source.unsplash.com/random/1024x768)"
        backgroundSize="cover"
        borderRadius={0}
        minHeight="100vh"
        color="white"
        bg="black"
      > */}
      <Flex minHeight="100vh" flexDirection="column" width={[1]}>
        <InnerFlex flexDirection="column">
          <ContentFlex
            alignItems="center"
            justifyContent="center"
            color="black"
            flexDirection="column"
            minHeight="100vh"
          >
            <Text
              mb={2}
              letterSpacing="0.5em"
              color="white"
              fontSize={[4, 3, 3]}
            >
              ATLAS
            </Text>
            <Cat width="300px" mx="auto" />

            <Box width="36px" mb={5}>
              <hr
                style={{
                  border: "4px solid white"
                }}
              />
            </Box>
            <Button
              shadow="0px 13px 27px 0px rgba(0, 0, 0, 0.1)"
              bg="rgb(238, 238, 238)"
            >
              <Text color="#e9486d">Login</Text>
            </Button>
            <FlexBase
              justifyContent="center"
              width="250px"
              // style={{ border: "1px solid white" }}
              py={3}
            >
              <Box width={1 / 3}>
                <hr
                  style={{
                    border: "1px solid white",
                    opacity: "0.5"
                  }}
                />
              </Box>
              <Box px={3}>
                <Text fontSize={1} color="#fff">
                  OR
                </Text>
              </Box>
              <Box width={1 / 3}>
                <hr
                  style={{
                    border: "1px solid white",
                    opacity: "0.5"
                  }}
                />
              </Box>
            </FlexBase>
            <LoginComponent>
              {mutate => (
                <Button
                  bg="transparent"
                  onClick={async () => {
                    const response = await mutate({
                      variables: {
                        email: "test@test.com",
                        password: "password"
                      }
                    });

                    console.log(response);
                  }}
                >
                  Create an account
                </Button>
              )}
            </LoginComponent>
            {/* <img src="/static/bg.png" /> */}
          </ContentFlex>
        </InnerFlex>
      </Flex>
      {/* </Card> */}
    </Layout>
  );
};

export default IndexPage;
