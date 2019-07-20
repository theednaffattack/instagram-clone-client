import { gql } from "apollo-boost";

export const SIGN_S3 = gql`
  mutation SignS3($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`;
