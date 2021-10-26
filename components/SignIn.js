import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

export default function SignIn() {
  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting

    try {
      const res = await signin();
      console.log({ res });
      if (
        res.data?.authenticateUserWithPassword.__typename ===
        'UserAuthenticationWithPasswordSuccess'
      ) {
        resetForm();
        router.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  }
  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    // eslint-disable-next-line react/jsx-no-bind
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md space-y-8" />
        <form onSubmit={handleSubmit} method="POST" className="mt-8 space-y-6">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign Into Your Account
          </h2>
          <Link href="/sign-up">
            <p className="text-green-600 font-light italic cursor-pointer hover:font-semibold">
              Don't have an account yet? Sign up for one!
            </p>
          </Link>
          <Link href="/request-reset">
            <p className="text-green-600 font-light italic cursor-pointer hover:font-semibold">
              Forgot your password?
            </p>
          </Link>
          {error ? <Error error={error} /> : null}
          <fieldset>
            <div className="rounded-md shadow-sm mb-2">
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <input
                type="email"
                name="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email Address"
                autoComplete="email"
                value={inputs.email}
                onChange={handleChange}
              />

              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                value={inputs.password}
                onChange={handleChange}
              />
            </div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              type="submit"
            >
              Sign In!
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
