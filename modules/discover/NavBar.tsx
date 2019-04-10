import React, { Component } from "react";
import {
  Flex as FlexBase,
  Text,
  Card as CardBase,
  Box as BoxBase
} from "rebass";
import styled from "styled-components";
import {
  borders,
  height,
  width,
  minHeight,
  maxWidth,
  space,
  position,
  top,
  right,
  bottom,
  left,
  zIndex
} from "styled-system";

// import MyLink from "../components/MyLink";
import MenuBase from "../../static/images/discover/menu2.svg";
import TravelIconBase from "../../static/images/discover/travels.svg";
import ExploreIconBase from "../../static/images/discover/explore.svg";
import SavedIconBase from "../../static/images/discover/saved.svg";
import ChatIconBase from "../../static/images/discover/chat.svg";
import ProfileIconBase from "../../static/images/discover/profile.svg";
import ActivityIconBase from "../../static/images/discover/activity.svg";
import SearchIconBase from "../../static/images/discover/search.svg";
import DotIconBase from "../../static/images/discover/dot.svg";

import NavLink from "../../components/NavLink";

const fadedText = "rgba(255,255,255,0.6)";

const Card = styled(CardBase)`
  ${maxWidth}
`;

const Menu = styled(MenuBase)`
  ${space}
  ${height}
  ${width}
`;

const InnerFlex = styled(FlexBase)`
  ${minHeight}
  background: url('/static/images/login/bg.png') center center no-repeat;
  background-size: cover;
`;

const ContentFlex = styled(FlexBase)`
  ${minHeight}
  ${borders}
`;

const navItemXMargin = "4em";

const NavBar = styled(FlexBase)`
${borders}
${height}
${position}
${minHeight}
  ${top}
  ${right}
  ${bottom}
  ${left}
  ${zIndex}

  box-sizing: border-box;
`;

//Icons
const TravelIcon = styled(TravelIconBase)`
${height}
${width}
${space}
`;

const ExploreIcon = styled(ExploreIconBase)`
${height}
${width}
${space}
`;

const SavedIcon = styled(SavedIconBase)`
${height}
${width}
${space}
`;

const ChatIcon = styled(ChatIconBase)`
${height}
${width}
${space}
`;

const ProfileIcon = styled(ProfileIconBase)`
${height}
${width}
${space}
`;

const ActivityIcon = styled(ActivityIconBase)`
${height}
${width}
${space}
`;

const SearchIcon = styled(SearchIconBase)`
${height}
${width}
${space}
`;

const DotIcon = styled(DotIconBase)`
${height}
${width}
${space}
`;

const Box = styled(BoxBase)`
  ${borders}
  border-bottom: 3px transparent solid;
  box-sizing: border-box;
  :hover {
    border-bottom: 3px pink solid;
  }
`;

const ContentNav = styled(FlexBase)`
  ${minHeight}
  ${borders}
  border-bottom: 3px transparent solid;
  box-sizing: border-box;
  :hover {
    border-bottom: 3px rgba(255, 255, 255, 0.8) solid;
  }
  :focus {
    border-bottom: 3px rgba(255, 255, 255, 0.8) solid;
  }
`;

export class NavBarTop extends Component {
  render() {
    return (
      <NavBar
        px={[4]}
        justifyContent="center"
        alignItems="center"
        height="100px"
        bg="transparent"
        width={1}
        mb={3}
      >
        <ContentFlex
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          width={[1]}
        >
          <ContentFlex width="200px">
            <ContentFlex alignItems="center" width={1 / 2}>
              <Menu mr="16px" height="1.5em" width="1.5em" />
              <Text mt={-2} color={fadedText} fontFamily="montserrat">
                Menu
              </Text>
            </ContentFlex>
          </ContentFlex>
          <ContentFlex
            alignItems="center"
            justifyContent="center"
            // border={devBorder1}
            width={[1 / 2]}
            mx="auto"
          >
            <ContentNav
              alignItems="center"
              flexDirection="column"
              p={4}
              width={1 / 5}
            >
              <TravelIcon mb={2} height="40px" />
              <Text fontSize=".9em" fontFamily="montserrat">
                <NavLink href="" name="Traveling" />
              </Text>
            </ContentNav>
            <ContentNav
              alignItems="center"
              flexDirection="column"
              p={4}
              width={1 / 5}
            >
              <ExploreIcon mb={2} height="40px" />
              <Text color={fadedText} fontSize=".9em" fontFamily="montserrat">
                <NavLink href="" name="Explore" fill={fadedText} />
              </Text>
            </ContentNav>
            <ContentNav
              alignItems="center"
              flexDirection="column"
              p={4}
              width={1 / 5}
            >
              <SavedIcon mb={2} height="40px" />
              <Text color={fadedText} fontSize=".9em" fontFamily="montserrat">
                <NavLink href="" name="Saved" fill={fadedText} />
              </Text>
            </ContentNav>
            <ContentNav
              alignItems="center"
              flexDirection="column"
              p={4}
              width={1 / 5}
            >
              <ChatIcon mb={2} height="40px" />
              <Text color={fadedText} fontSize=".9em" fontFamily="montserrat">
                <NavLink href="" name="Chat" fill={fadedText} />
              </Text>
            </ContentNav>
            <ContentNav
              alignItems="center"
              flexDirection="column"
              p={4}
              width={1 / 5}
            >
              <ProfileIcon mb={2} height="40px" />
              <Text fontSize=".9em" fontFamily="montserrat">
                <NavLink href="" name="Profile" fill={fadedText} />
              </Text>
            </ContentNav>
          </ContentFlex>

          <ContentFlex>
            <ContentFlex
              alignItems="center"
              flexDirection="column"
              p={4}
              width={1 / 5}
            >
              <ActivityIcon height="40px" />
              <DotIcon mt={-3} height="10px" />
            </ContentFlex>
            <ContentFlex
              alignItems="center"
              flexDirection="column"
              p={4}
              width={1 / 5}
            >
              <SearchIcon mb={2} height="40px" />
            </ContentFlex>
          </ContentFlex>
        </ContentFlex>
      </NavBar>
    );
  }
}
