import { gql } from "apollo-boost";

export const GET_ALL_MY_MESSAGES = gql`
  query GetListToCreateThread {
    getListToCreateThread {
      id
      firstName
      thoseICanMessage {
        id
        firstName
        lastName
      }
    }
  }
`;
