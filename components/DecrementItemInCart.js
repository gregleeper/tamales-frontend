import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { MinusIcon } from '@heroicons/react/outline';

const DECREMENT_CART_ITEM_QUANTITY = gql`
  mutation DecrementCartItemMutation(
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
export default function DecrementCartItemQuantity({ id, quantity, disabled }) {
  const [decrementCartItem, { loading }] = useMutation(
    DECREMENT_CART_ITEM_QUANTITY,
    {
      variables: { where: { id }, data: { quantity } },
    }
  );
  return (
    <button
      disabled={loading}
      type="button"
      onClick={decrementCartItem}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      disabled={disabled}
      className="bg-white text-red-600 py-1 px-2 border-2 border-red-600 rounded disabled:opacity-20"
    >
      <MinusIcon className="h-6 w-6" />
    </button>
  );
}
