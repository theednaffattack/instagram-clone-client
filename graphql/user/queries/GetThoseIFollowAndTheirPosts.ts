import { gql } from "apollo-boost";

export const GetThoseIFollowAndTheirPostsResolver = gql`
  query GetThoseIFollowAndTheirPostsResolver {
    getThoseIFollowAndTheirPostsResolver {
      id
      firstName
      lastName
      email
      name
      following {
        id
        firstName
        posts {
          id
          title
          text
          images {
            id
            uri
          }
        }
      }
    }
  }
`;
