// Create the graphql queries

import { gql } from "@apollo/client";

export const SEARCH_BOOKS = gql `
  query searchBooks($query: String!) {
    searchBooks(query: $query) {
      bookId
      authors
      title
      description
      image
    }
  }
`;

