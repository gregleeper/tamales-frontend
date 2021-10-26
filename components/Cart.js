import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useCart } from '../lib/cartState';
import { useUser } from './User';
import formatMoney from '../lib/formatMoney';
import RemoveFromCart from './RemoveFromCart';
import IncrementCartItemQuantity from './IncrementItemInCart';
import DecrementCartItemQuantity from './DecrementItemInCart';
import { Checkout } from './Checkout';
import calcTotalPrice from '../lib/calcTotalPrice';

// eslint-disable-next-line react/prop-types
function CartItem({ cartItem }) {
  // eslint-disable-next-line react/prop-types
  const { product } = cartItem;
  if (!product) return null;

  return (
    <li className="px-2 pt-8 border-b-2 border-gray-300">
      <div className="flex">
        <div className="w-1/4  ">
          <Image
            className="mr-1"
            src={product.photo.image.publicUrl}
            width="100"
            height="100"
            layout="fixed"
            alt={product.name}
          />
        </div>
        <div className=" pl-6">
          <h5 className="text-left">{product.name}</h5>
          <p>{formatMoney(product.price * cartItem.quantity)}</p>
          <em>
            Qty: {cartItem.quantity} &times; {formatMoney(product.price)}
          </em>
          <div className="flex space-x-3">
            <div>
              <DecrementCartItemQuantity
                id={cartItem.id}
                quantity={cartItem.quantity - 1}
                disabled={cartItem.quantity === 1}
              />
            </div>
            <div>
              <IncrementCartItemQuantity
                id={cartItem.id}
                quantity={cartItem.quantity + 1}
              />
            </div>
            <div>
              <RemoveFromCart id={cartItem.id} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Cart() {
  const { cartOpen, closeCart } = useCart();
  const user = useUser();

  const total = calcTotalPrice(user?.cart ? user.cart : []);

  return (
    <Transition.Root show={cartOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={closeCart}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        {user ? `${user.name}'s Cart` : 'Please Sign In'}
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          onClick={closeCart}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 px-4 sm:px-6">
                    <ul>
                      {user && user.cart.length
                        ? user.cart.map((product) => (
                            <CartItem cartItem={product} />
                          ))
                        : null}
                    </ul>
                    <div className="text-lg font-semibold py-2">
                      <p>Total Price: ${total ? total / 100 : 0}</p>
                    </div>
                  </div>
                  <Checkout />
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
