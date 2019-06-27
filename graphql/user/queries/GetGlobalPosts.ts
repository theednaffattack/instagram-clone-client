import { gql } from "apollo-boost";

export const GET_GLOBAL_POSTS = gql`
  query GetGlobalPosts {
    getGlobalPosts {
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
