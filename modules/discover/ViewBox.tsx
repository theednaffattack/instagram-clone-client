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
import { DiscoverButton } from "./DiscoverButton";

import DestinationCard from "./Card";

import WeatherSunnyIconBase from "../../static/images/discover/weather_sunny.svg";
import LoveIconBase from "../../static/images/discover/love.svg";
import CommentIconBase from "../../static/images/discover/comment.svg";
import MoreIconBase from "../../static/images/discover/more.svg";
import { string } from "prop-types";

import { FeaturedCards } from "./FeaturedCards";
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

const Card = styled(CardBase)`
  ${minWidth}
`;
// return(
//     <span>{}</span>
// )

export default class ViewBox extends Component {
  constructor(props: any) {
    super(props);
    this.truncate = this.truncate.bind(this);
  }
  truncate(words: string) {
    console.log("words", words);
    console.log("words length", words.length);
    if (words.length > 16) {
      return words.slice(0, 16) + "...";
    } else {
      return words;
    }
  }
  render() {
    let self = this;
    return (
      <ContentFlex py={4} width={1} flexDirection="column">
        <ContentFlex
          justifyContent="center"
          flexWrap="wrap"
          width={2 / 3}
          mx="auto"
          pb={5}
        >
          <Box>
            <Heading width={1} as="h2">
              Featured
            </Heading>
          </Box>
          <Box ml="auto">
            <DiscoverButton />
          </Box>
        </ContentFlex>
        <ContentFlex justifyContent="center" flexWrap="wrap" px={6}>
          <FeaturedCards localContext={this.truncate} />
        </ContentFlex>
      </ContentFlex>
    );
  }
}
