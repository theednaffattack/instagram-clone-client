import { gql } from "apollo-boost";

export const MESSAGE_THREADS = gql`
  subscription MessageThreads($data: AddMessageToThreadInput_v2!) {
    messageThreads(data: $data) {
      success
      message {
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
