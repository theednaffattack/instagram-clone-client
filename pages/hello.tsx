import React from "react";
import { Flex as FlexBase, Box, Text } from "rebass";
import { minHeight } from "styled-system";
import styled from "styled-components";
import Layout from "../components/Layout";
import { HelloWorldComponent } from "../generated/apolloComponents";

const Flex = styled(FlexBase)`
  ${minHeight}
`;

export default function() {
  return (
    <Layout>
      <Flex
        minHeight="50vh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <HelloWorldComponent>
          {data => (
            <Box>
              <Text fontSize={[4]}>
                {data && data.data && data.data.helloWorld
                  ? data.data.helloWorld
                  : "loading..."}
              </Text>
            </Box>
          )}
        </HelloWorldComponent>
      </Flex>
    </Layout>
  );
}
