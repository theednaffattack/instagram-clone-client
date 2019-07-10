import { gql } from "apollo-boost";

export const ADD_MESSAGE_TO_THREAD = gql`
  mutation AddMessageToThread(
    $threadId: ID!
    $sentTo: String!
    $message: String!
    $images: [Upload]
  ) {
    addMessageToThread(
      threadId: $threadId
      sentTo: $sentTo
      message: $message
      images: $images
    ) {
      success
      threadId
      message {
        id
        message

        images {
          id
          uri
        }
        sentBy {
          id
          firstName
        }
        user {
          id
          firstName
        }
      }

      user {
        id
        firstName
      }
    }
  }
`;
