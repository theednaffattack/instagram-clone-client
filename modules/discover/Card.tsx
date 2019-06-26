import React, { Component } from "react";

import {
  Box,
  Card as CardBase,
  Flex as FlexBase,
  Heading,
  Image,
  Text
} from "rebass";
import styled from "styled-components";
import {
  borders,
  height,
  minHeight,
  minWidth,
  space,
  width
} from "styled-system";

import WeatherSunnyIconBase from "../../static/images/discover/weather_sunny.svg";
import LoveIconBase from "../../static/images/discover/love.svg";
import CommentIconBase from "../../static/images/discover/comment.svg";
import MoreIconBase from "../../static/images/discover/more.svg";

const museum_photo = "../../static/images/discover/cards/ny_art_museum.png";

//Icons
const SunnyIcon = styled(WeatherSunnyIconBase)`
${height}
${width}
${space}
`;
const LoveIcon = styled(LoveIconBase)`
${height}
${width}
${space}
`;

const CommentIcon = styled(CommentIconBase)`
${height}
${width}
${space}
`;

const MoreIcon = styled(MoreIconBase)`
${height}
${width}
${space}
`;

const ContentFlex = styled(FlexBase)`
  ${minHeight}
  ${borders}
`;

const StyledCard = styled(CardBase)`
  ${minWidth}
`;

export default class DestinationCard extends Component {
  truncate(words: string) {
    if (words.length > 16) {
      return words.slice(0, 16) + "...";
    } else {
      return words;
    }
  }
  render() {
    return (
      <StyledCard
        borderRadius="card"
        boxShadow="special"
        bg="#eeeeee"
        color="text"
        p={3}
        width={1 / 5}
        minWidth="200px"
      >
        <Image src={museum_photo} />
        <ContentFlex alignItems="center">
          <Box>
            <Text fontWeight="600">
              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                {this.truncate("New York Art Museum")}
              </span>
            </Text>
            <Text fontSize=".75em">$967 • 257 Km away</Text>
          </Box>
          <Box pl={1}>
            <MoreIcon height="16px" />
          </Box>
        </ContentFlex>
        <ContentFlex alignItems="center">
          <SunnyIcon height="30px" />
          <Box>
            <Text width={1} textAlign="center">
              26°
            </Text>
            <Text fontSize=".75em">Sunny</Text>
          </Box>
          <ContentFlex pt={1} ml={2} width={1} borderTop="2px #ccc solid">
            <Box pl={2}>
              <LoveIcon height="12px" />
            </Box>
            <Box pl="2px" fontSize=".75em">
              4K
            </Box>
            <Box pl={3}>
              <CommentIcon height="12px" />
            </Box>
            <Box pl="2px" fontSize=".75em">
              766
            </Box>
          </ContentFlex>
        </ContentFlex>
      </StyledCard>
    );
  }
}
