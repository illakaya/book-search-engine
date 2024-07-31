// Create the graphql mutations

import { gql } from "@apollo/client";

export const SAVE_BOOK = gql`
  mutation saveBook($book: BookInput!) {
    saveBook(book: $book) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        title
        description
        image
      }
      bookCount
    }
  }
`;