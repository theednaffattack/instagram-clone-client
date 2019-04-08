import React from "react";
import Layout from "../components/Layout";
import { WrapDark, ContentFlex } from "../modules/register/WrapDark";
import { Text } from "rebass";

import IconBase from "../static/images/register/check-email.svg";

import { space, width } from "styled-system";
import styled from "styled-components";
import { Button } from "../components/Button/Button";

const IconEmail = styled(IconBase)`
  ${space}
  ${width}
`;

export default ({ handleDismiss }: any) => {
  return (
    <Layout>
      <WrapDark>
        <ContentFlex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <IconEmail mx="auto" mb={4} />
          <Text mb={3} fontSize={[3]} fontWeight="bold" fontFamily="montserrat">
            We sent you an email!
          </Text>
          <Text fontFamily="montserrat">
            Please check your email to confirm your account.
          </Text>
          <Button mt={5} onClick={handleDismiss} label="Got it!" />
        </ContentFlex>
      </WrapDark>
    </Layout>
  );
};
