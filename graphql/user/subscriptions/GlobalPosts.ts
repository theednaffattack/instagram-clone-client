import { gql } from "apollo-boost";

export const GLOBAL_POSTS = gql`
  subscription GlobalPosts {
    globalPosts {
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
        lastName
      }
    }
  }
`;
