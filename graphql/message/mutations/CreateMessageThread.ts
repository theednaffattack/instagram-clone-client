import { gql } from "apollo-boost";

export const CREATE_MESSAGE_THREAD = gql`
  mutation CreateMessageThread(
    $sentTo: String!
    $message: String!
    $images: [Upload]
  ) {
    createMessageThread(sentTo: $sentTo, message: $message, images: $images) {
      id
      invitees {
        id
        firstName
        lastName
      }
      messages {
        id
        created_at
        message
        images {
          id
          uri
        }
        sentBy {
          id
          firstName
          lastName
        }
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`;
