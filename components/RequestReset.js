import { useMutation } from '@apollo/client';
import Link from 'next/link';
import useForm from '../lib/useForm';
import { requestResetMutation } from '../graphql/Mutations';

import Error from './ErrorMessage';

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  const [requestReset, { data, error }] = useMutation(requestResetMutation, {
    variables: inputs,
    // refetch the currently logged in user
  });
  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting

    try {
      const res = await requestReset();
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    resetForm();
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-1/2 mx-auto">
      <div className="max-w-md space-y-8" />
      <form onSubmit={handleSubmit} method="POST" className="mt-8 space-y-6">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Request a Password Reset
        </h2>
        <Link href="/sign-in">
          <p className="text-green-600 font-light italic cursor-pointer hover:font-semibold">
            Already have an account? Sign In!
          </p>
        </Link>
        <Error error={error} />
        <fieldset>
          {data?.sendUserPasswordResetLink === null && (
            <p>Success! Check your email for a link!</p>
          )}
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
          </div>
          <button
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            type="submit"
          >
            Submit!
          </button>
        </fieldset>
      </form>
    </div>
  );
}
