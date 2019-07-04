import { gql } from "apollo-boost";

export const getHotelByID = gql`
  query GetMyMessagesFromUser($input: GetMessagesFromUserInput!) {
    getMyMessagesFromUser(input: $input) {
      id
      message
      created_at
      sentBy {
        id
        firstName
        lastName
      }
    }
  }
`;
