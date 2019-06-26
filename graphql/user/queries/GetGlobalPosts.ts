import { gql } from "apollo-boost";

export const GET_GLOBAL_POSTS = gql`
  query GetGobalPosts {
    getGobalPosts {
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
