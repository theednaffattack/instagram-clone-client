import { gql } from "apollo-boost";

export const ADD_MESSAGE_TO_THREAD = gql`
  mutation AddMessageToThread(
    $threadId: ID!
    $sentTo: String!
    $message: String!
  ) {
    addMessageToThread(
      threadId: $threadId
      sentTo: $sentTo
      message: $message
    ) {
      success
      message {
        id
        message
        sentBy {
          id
          firstName
        }
      }
    }
  }
`;
