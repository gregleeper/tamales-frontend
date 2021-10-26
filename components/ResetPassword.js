/* eslint-disable react/prop-types */
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import useForm from '../lib/useForm';
import Error from './ErrorMessage';
import { resetMutation } from '../graphql/Mutations';

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });
  const [reset, { data, loading, error }] = useMutation(resetMutation, {
    variables: inputs,
  });
  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;
  console.log(error);
  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting
    console.log(inputs);
    const res = await reset().catch(console.error);
    console.log(res);
    console.log({ data, loading, error });
    resetForm();
    // Send the email and password to the graphqlAPI
  }
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md space-y-8" />
      <form onSubmit={handleSubmit} method="POST" className="mt-8 space-y-6">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset Your Password
        </h2>

        <Error error={error || successfulError} />

        {data?.redeemUserPasswordResetToken === null && (
          <p>
            {`You've successfully reset your password. Now you can sign in! `}
            <Link href="/sign-in">
              <p className="text-green-600 text-lg underline cursor-pointer hover:font-medium">
                Sign In
              </p>
            </Link>
          </p>
        )}

        <fieldset hidden={data?.redeemUserPasswordResetToken === null}>
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
            Reset Password!
          </button>
        </fieldset>
      </form>
    </div>
  );
}
