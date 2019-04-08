import react from "React";
import { Flex as FlexBase, Text as TextBase } from "rebass";
import styled from "styled-components";
import { borders, maxWidth } from "styled-system";
import MyLink from "../MyLink";

const Flex = styled(FlexBase)`
  ${borders}
  ${maxWidth}
`;

const Text = styled(TextBase)`
  ${borders}
`;

export const SignUpLink = ({ maxWidth }) => {
  return (
    <Flex
      justifyContent="center"
      width={1}
      maxWidth={["300px"]}
      borderTop="2px rgba(255,255,255,0.4) solid"
      p={3}
      my={4}
    >
      <Text fontFamily="montserrat" color="rgba(255,255,255,.6)">
        Not a user?
      </Text>
      &nbsp; &nbsp;
      <Text fontFamily="montserrat" color="rgba(255,255,255,.8)">
        <MyLink href="register" name="Sign Up" />
      </Text>
    </Flex>
  );
};
