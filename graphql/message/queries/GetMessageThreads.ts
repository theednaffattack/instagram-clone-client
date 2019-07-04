import { gql } from "apollo-boost";

export const GET_MESSAGE_THREADS = gql`
  query GetMessageThreads {
    getMessageThreads {
      id
      messages {
        id
        message
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
