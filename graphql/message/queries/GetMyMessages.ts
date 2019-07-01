import { gql } from "apollo-boost";

export const getHotelByID = gql`
  query GetMyMessagesFromUser($input: GetMessagesFromUserInput!) {
    getMyMessagesFromUser(input: $input) {
      id
      message
      createdAt
      sentBy {
        id
        firstName
      }
    }
  }
`;
