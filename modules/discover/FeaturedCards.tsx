import React from "react";
import { Box, Card as CardBase, Flex as FlexBase, Image, Text } from "rebass";
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
import { cardInfo } from "./cardInfo";

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

const Card = styled(CardBase)`
  ${minWidth}
`;

export const FeaturedCards = ({ localContext }: any) => {
  return cardInfo.map(info => (
    <Box width={256}>
      <Card
        borderRadius="card"
        boxShadow="special"
        bg="#eeeeee"
        color="text"
        p={3}
        width={1 / 5}
        minWidth="200px"
      >
        <Image src={info.imageURI} />
        <ContentFlex alignItems="center">
          <Box>
            <Text fontWeight="600">
              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                {localContext(info.name)}
              </span>
            </Text>
            <Text fontSize=".75em">
              {info.price} • {info.distanceKm} away
            </Text>
          </Box>
          <Box ml="auto">
            <MoreIcon height="16px" />
          </Box>
        </ContentFlex>
        <ContentFlex alignItems="center">
          <SunnyIcon height="30px" />
          <Box>
            <Text width={1} textAlign="center">
              {info.temperature}°
            </Text>
            <Text fontSize=".75em">{info.weatherDescription}</Text>
          </Box>
          <ContentFlex pt={1} ml={2} width={1} borderTop="2px #ccc solid">
            <Box pl={2}>
              <LoveIcon height="12px" />
            </Box>
            <Box pl="2px" fontSize=".75em">
              {info.loveCount > 999
                ? (info.loveCount / 1000).toString() + "K"
                : info.loveCount}
            </Box>
            <Box pl={3}>
              <CommentIcon height="12px" />
            </Box>
            <Box pl="2px" fontSize=".75em">
              {info.commentCount}
            </Box>
          </ContentFlex>
        </ContentFlex>
      </Card>
    </Box>
  ));
};
