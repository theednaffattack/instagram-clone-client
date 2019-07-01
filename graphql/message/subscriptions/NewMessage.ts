import { gql } from "apollo-boost";

export const newMessageSub = gql`
  subscription NewMessage($message: String!, $sentTo: String!) {
    newMessage(message: $message, sentTo: $sentTo) {
      id
      message
      sentBy {
        id
        firstName
      }
      user {
        id
        firstName
      }
      createdAt
      updatedAt
    }
  }
`;
