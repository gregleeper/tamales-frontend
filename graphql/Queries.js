import gql from 'graphql-tag';

export const listProducts = gql`
  query ListProducts {
    products {
      id
      name
      price
      description
      status
      photo {
        image {
          id
          publicUrl
        }
      }
    }
  }
`;
