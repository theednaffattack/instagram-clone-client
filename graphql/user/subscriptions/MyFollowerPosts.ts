import { gql } from "apollo-boost";

export const MyFollowerPosts = gql`
  subscription MyFollowerPosts($data: QuickPostSubsInput!) {
    followingPosts(data: $data) {
      id
      title
      text
      images {
        id
        uri
      }
      user {
        id
        firstName
      }
    }
  }
`;
