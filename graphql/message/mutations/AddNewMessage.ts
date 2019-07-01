import { gql } from "apollo-boost";

export const AddNewMessage = gql`
  mutation AddNewMessage($sentTo: String!, $message: String!) {
    addNewMessage(sentTo: $sentTo, message: $message)
  }
`;
