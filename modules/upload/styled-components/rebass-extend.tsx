import { Flex as FlexBase } from "rebass";
import { borders, minHeight } from "styled-system";
import styled from "styled-components";

export const Flex = styled(FlexBase)`
  ${borders}
  ${minHeight}
`;
