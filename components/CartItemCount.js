import { useUser } from './User';

export default function CartItemCount() {
  const user = useUser();
  const totalItemCount =
    user && user.cart.reduce((sum, c) => sum + c.quantity, 0);
  if (totalItemCount === 0 || !user) {
    return null;
  }
  return (
    <div className="text-xs bg-green-600 text-white h-6 w-6 flex items-center justify-center rounded-full -ml-2 -mt-3">
      {totalItemCount}
    </div>
  );
}
