import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import useForm from '../lib/useForm';
import { signUpMutation } from '../graphql/Mutations';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

export default function SignUp() {
  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
    phone: '',
  });
  const [signUp, { data, loading, error }] = useMutation(signUpMutation, {
    variables: inputs,
    // refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  async function handleSubmit(e) {
    e.preventDefault(); // stop the form from submitting

    try {
      const res = await signUp();
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
          Sign Up for an Account
        </h2>
        <Link href="/sign-in">
          <p className="text-green-600 font-light italic cursor-pointer hover:font-semibold">
            Already have an account? Sign In!
          </p>
        </Link>
        <Error error={error} />
        <fieldset>
          {data?.createUser && (
            <div className="py-4">
              <SuccessMessage
                title="Successful Signup!!"
                message="Now you can sign in!"
              >
                <Link href="/sign-in">
                  <p className="text-green-600 text-lg underline cursor-pointer hover:font-medium transition-transform druation-150 ease-in hover:-translate-x-1 hover:scale-95">
                    Sign In
                  </p>
                </Link>
              </SuccessMessage>
            </div>
          )}
          <div className="rounded-md shadow-sm mb-2">
            <label htmlFor="name" className="sr-only">
              Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="Full Name"
              autoComplete="name"
              value={inputs.name}
              onChange={handleChange}
            />
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <input
              type="email"
              name="email"
              id="email"
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
              id="password"
              placeholder="Password"
              autoComplete="password"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              value={inputs.password}
              onChange={handleChange}
            />
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone number: 6205551234"
              autoComplete="phone"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              value={inputs.phone}
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
