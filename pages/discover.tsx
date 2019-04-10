// import { Field, Formik } from "formik";
import React from "react";
import { Flex as FlexBase, Heading } from "rebass";
import styled from "styled-components";
import { borders, minHeight } from "styled-system";

import Layout from "../components/Layout";
import DiscoverSelect from "../modules/discover/DiscoverSelect";
import ViewBox from "../modules/discover/ViewBox";
import { NavBarTop } from "../modules/discover/NavBar";

const devBorder1 = "2px white solid";
const devBorder2 = "4px limegreen solid";

const Flex = styled(FlexBase)`
  ${minHeight}

  background-image: linear-gradient(
    0deg,
    rgba(210, 48, 120, 1) 6%,
    rgba(254, 97, 97, 1) 74%,
    rgba(255, 121, 85, 1) 100%
  );
`;

const ContentFlex = styled(FlexBase)`
  ${minHeight}
  ${borders}
`;

export default () => {
  return (
    <Layout title="Discover">
      <Flex color="white" flexDirection="column" minHeight="100vh">
        {/* PUT NAVBAR RIGHT HERE */}
        <NavBarTop />
        <ContentFlex
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          width={1}
        >
          <ContentFlex mt={[0, 5, 0]} flexDirection="column" width={[1 / 2]}>
            <Heading
              color="rgba(255,255,255,0.5)"
              fontSize={[5]}
              fontFamily="sans"
              py={3}
            >
              Pick a category for your next adventure
            </Heading>
            <ContentFlex py={3} alignItems="center" width={1}>
              <DiscoverSelect />
            </ContentFlex>
          </ContentFlex>

          <ViewBox />
        </ContentFlex>
      </Flex>
    </Layout>
  );
};
