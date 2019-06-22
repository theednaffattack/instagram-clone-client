import { gql } from "apollo-boost";

export const CreatePostMutation = gql`
  mutation CreatePost($data: PostInput!) {
    createPost(data: $data) {
      id
      title
      text
    }
  }
`;
