import react from "React";
import { Button as ButtonBase, Text } from "rebass";
import { borderRadius, boxShadow } from "styled-system";
import styled from "styled-components";

const Button = styled(ButtonBase)`
  ${borderRadius}
  ${boxShadow}
  border: 4px transparent solid;

  :focus {
    outline: 0;
    border: 4px limegreen solid;
  }
`;

export const DiscoverButton = (props: any) => {
  return (
    <Button
      borderRadius="25px"
      bg="#eee"
      p={0}
      boxShadow="0px 10px 20px 0px rgba(0, 0, 0, 0.15)"
      ml="auto"
      // height="25px"
    >
      <Text color="#e9486d" fontFamily="sans">
        See all >
      </Text>
    </Button>
  );
};
