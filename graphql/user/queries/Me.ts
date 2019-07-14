import { gql } from "apollo-boost";

export const meQuery = gql`
  query me {
    me {
      firstName
      lastName
      email
      name
      id
    }
  }
`;
