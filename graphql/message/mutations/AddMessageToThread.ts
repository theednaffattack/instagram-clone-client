import { gql } from "apollo-boost";

export const ADD_MESSAGE_TO_THREAD = gql`
  mutation AddMessageToThread(
    $threadId: ID!
    $sentTo: String!
    $message: String!
    $invitees: [ID!]!
    $images: [Upload]
  ) {
    addMessageToThread(
      threadId: $threadId
      sentTo: $sentTo
      message: $message
      invitees: $invitees
      images: $images
    ) {
      success
      invitees {
        id
        firstName
        lastName
      }
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
