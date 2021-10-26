import { loadStripe } from '@stripe/stripe-js';
import nProgress from 'nprogress';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Router, useRouter } from 'next/dist/client/router';
import { useCart } from '../lib/cartState';
import { CURRENT_USER_QUERY } from './User';

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { closeCart } = useCart();
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  async function handleSubmit(e) {
    // 1. Stop the form from submitting and turn the loader one
    e.preventDefault();
    setLoading(true);
    console.log('We gotta do some work..');
    nProgress.start();
    // 3. Create the payment method via stripe (Token comes back here if successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);
    // 4. Handle any errors from stripe
    if (error) {
      setError(error);
      nProgress.done();
      return; // stops the checkout from happening
    }
    // 5. Send the token from step 3 to our keystone server, via a custom mutation!
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });
    console.log(`Finished with the order!!`);
    console.log(order);
    // 6. Change the page to view the order
    router.push({
      pathname: `/order/[id]`,
      query: {
        id: order.data.checkout.id,
      },
    });
    // 7. Close the cart
    closeCart();

    // 8. turn the loader off
    setLoading(false);
    nProgress.done();
  }

  return (
    <div
      onSubmit={handleSubmit}
      className="grid grid-flow-row gap-1 p-2 border border-gray-300 text-lg w-8/12 mx-auto mt-4"
    >
      {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
      {graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>}
      <CardElement />
      <button
        type="submit"
        onClick={handleSubmit}
        className="py-1 px-2 bg-green-600 text-white focus:bg-green-600 hover:font-medium mt-8"
        disabled={loading}
      >
        Check Out Now
      </button>
    </div>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}

export { Checkout };
