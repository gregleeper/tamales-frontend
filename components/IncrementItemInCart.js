import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { PlusIcon } from '@heroicons/react/outline';

const INCREMENT_CART_ITEM_QUANTITY = gql`
  mutation IncrementCartItemMutation(
    $where: CartItemWhereUniqueInput!
    $data: CartItemUpdateInput!
  ) {
    updateCartItem(where: $where, data: $data) {
      id
      quantity
    }
  }
`;

// eslint-disable-next-line react/prop-types
export default function IncrementCartItemQuantity({ id, quantity }) {
  const [incrementCartItem, { loading }] = useMutation(
    INCREMENT_CART_ITEM_QUANTITY,
    {
      variables: { where: { id }, data: { quantity } },
    }
  );
  return (
    <button
      disabled={loading}
      type="button"
      onClick={incrementCartItem}
      className="bg-white text-green-600 py-1 px-2 border-2 border-green-600 rounded"
    >
      <PlusIcon className="h-6 w-6" />
    </button>
  );
}
