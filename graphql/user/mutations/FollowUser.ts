import { gql } from "apollo-boost";

export const confirmUserMutation = gql`
  mutation FollowUser($data: FollowUserInput!) {
    followUser(data: $data)
  }
`;
