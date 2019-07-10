import { gql } from "apollo-boost";

export const GET_MESSAGE_THREADS = gql`
  query GetMessageThreads {
    getMessageThreads {
      id
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
