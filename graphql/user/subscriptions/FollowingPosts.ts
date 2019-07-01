import { gql } from "apollo-boost";

export const FOLLOWING_POSTS = gql`
  subscription FollowingPosts($data: QuickPostSubsInput!) {
    followingPosts(data: $data) {
      id
      title
      text
      created_at
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
