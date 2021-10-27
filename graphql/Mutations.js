import gql from 'graphql-tag';

export const signOutMutation = gql`
  mutation {
    endSession
  }
`;

export const signUpMutation = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(
      data: { email: $email, name: $name, password: $password, phone: $phone }
    ) {
      id
      email
      name
      phone
    }
  }
`;

export const requestResetMutation = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email)
  }
`;

export const resetMutation = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;
