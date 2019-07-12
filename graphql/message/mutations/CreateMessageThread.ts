import { gql } from "apollo-boost";

export const CREATE_MESSAGE_THREAD = gql`
  mutation CreateMessageThread($sentTo: String!, $message: String!) {
    createMessageThread(sentTo: $sentTo, message: $message) {
      id
      invitees {
        id
        firstName
        lastName
      }
      messages {
        id
        message
      }
      invitees {
        id
        firstName
        lastName
      }
    }
  }
`;
