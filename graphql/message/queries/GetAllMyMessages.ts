import { gql } from "apollo-boost";

export const GET_ALL_MY_MESSAGES = gql`
  query GetAllMyMessages {
    getAllMyMessages {
      id
      firstName
      mappedMessages {
        id
        createdAt
        updatedAt
        message
        sentBy {
          id
          firstName
        }
        user {
          id
          firstName
        }
      }
    }
  }
`;
