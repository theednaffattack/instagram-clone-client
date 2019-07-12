import React from "react";

import { Button, Flex, Icon, Text } from "./StyledRebass";

function UserProfileImage({
  user,
  flexDirection,
  color,
  handleRemoveInviteeToThread
}: any) {
  return (
    <Flex
      mr={3}
      flexDirection={flexDirection ? flexDirection : "row"}
      alignItems="center"
    >
      <Flex
        height="40px"
        width="40px"
        my={2}
        mx={2}
        bg="thread_footer"
        alignItems="center"
        justifyContent="center"
        boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
        style={{ borderRadius: "50%", overflow: "hidden" }}
      >
        <Icon mt={3} size="2em" name="user" fill="white" />
      </Flex>
      <Text color={color ? color : "text"}>
        {user.firstName} {user.lastName}
      </Text>
      {flexDirection === "column" ? (
        ""
      ) : (
        <Button
          m={0}
          ml={2}
          type="button"
          bg="rgba(0,0,0,0.2)"
          style={{ overflow: "hidden", padding: 0 }}
          onClick={() => handleRemoveInviteeToThread({ user })}
        >
          <Icon name="close" size="1.5em" fill="#b2b2d8" />
        </Button>
      )}
    </Flex>
  );
}

export default UserProfileImage;
