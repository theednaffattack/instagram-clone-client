import react from "React";
import { Flex as FlexBase, Text as TextBase } from "rebass";
import styled from "styled-components";
import { borders, maxWidth } from "styled-system";
import MyLink from "../../../components/MyLink";

const Flex = styled(FlexBase)`
  ${borders}
  ${maxWidth}
`;

const Text = styled(TextBase)`
  ${borders}
`;

export const SignInFooter = ({ maxWidth }: any) => {
  return (
    <Flex
      justifyContent="center"
      width={1}
      borderTop="2px rgba(255,255,255,0.6) solid"
      maxWidth={maxWidth}
      p={3}
      my={4}
    >
      <Text fontFamily="montserrat" color="rgba(255,255,255,.6)">
        Already a member?
      </Text>
      &nbsp; &nbsp;
      <Text fontFamily="montserrat" color="rgba(255,255,255,.8)">
        <MyLink href="login" name="Sign In" />
      </Text>
    </Flex>
  );
};
