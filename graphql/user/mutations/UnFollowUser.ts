import { gql } from "apollo-boost";

export const registerMutation = gql`
  mutation UnFollowUser($data: UnFollowUserInput!) {
    unFollowUser(data: $data) {
      id
      firstName
    }
  }
`;
