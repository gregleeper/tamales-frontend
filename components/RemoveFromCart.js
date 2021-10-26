import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { TrashIcon } from '@heroicons/react/outline';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($where: CartItemWhereUniqueInput!) {
    deleteCartItem(where: $where) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

// eslint-disable-next-line react/prop-types
export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { where: { id } },
    update,
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: 'CartItem',
    //     id,
    //   },
    // },
  });
  return (
    <button
      onClick={removeFromCart}
      disabled={loading}
      type="button"
      title="Remove This Item from Cart"
      className="text-red-600 mt-2 focus:text-red-400 focus:outline-black"
    >
      <TrashIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}
