import { gql } from "apollo-boost";

export const CREATE_MESSAGE_THREAD = gql`
  mutation CreateMessageThread(
    $sentTo: String!
    $message: String!
    $images: [Upload]
    $invitees: [ID!]!
  ) {
    createMessageThread(
      sentTo: $sentTo
      message: $message
      images: $images
      invitees: $invitees
    ) {
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
