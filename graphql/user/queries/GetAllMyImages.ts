import { gql } from "apollo-boost";

export const confirmUserMutation = gql`
  query GetAllMyImages {
    GetAllMyImages {
      id
      uri
    }
  }
`;
