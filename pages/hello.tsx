import React from "react";
import { Flex as FlexBase } from "rebass";
import { minHeight } from "styled-system";
import styled from "styled-components";
import Layout from "../components/Layout";

const Flex = styled(FlexBase)`
  ${minHeight}
`;

export default function Hello() {
  return (
    <Layout>
      <Flex alignItems="center" justifyContent="center" flexDirection="column">
        The text goes here
      </Flex>
    </Layout>
  );
}
