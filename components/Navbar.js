import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { useUser, CURRENT_USER_QUERY } from './User';
import { getInitials } from '../lib/tools';
import { useCart } from '../lib/cartState';
import CartItemCount from './CartItemCount';
import { signOutMutation } from '../graphql/Mutations';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const user = useUser();
  const { openCart } = useCart();

  function update(cache, payload) {
    console.log(cache);
    cache.evict(cache);
  }

  const [signOut, { loading }] = useMutation(signOutMutation, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    update,
  });
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center px-6">
                  <h3 className="text-3xl text-green-600 font-light font-sans cursor-pointer">
                    <Link href="/">Tamales!!</Link>
                  </h3>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-green-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <div className="border-green-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer">
                    <Link href="/">Menu</Link>
                  </div>
                  <div className="border-green-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer">
                    <Link href="/about">About</Link>
                  </div>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <button
                  type="button"
                  onClick={openCart}
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <span className="sr-only">View Cart</span>
                  <div className="flex">
                    <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                    <CartItemCount />
                  </div>
                </button>

                {/* Profile dropdown */}
                {user ? (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-green-600 rounded-full flex text-white text-sm focus:outline-none p-2 focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        <span className="sr-only">Open user menu</span>
                        {getInitials(user.name)}
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute origin-top-right right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-500 hover:text-gray-800'
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              href="#"
                              className="text-left text-sm block px-4 py-2 font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full"
                              onClick={signOut}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="text-gray-900 inline-flex items-center px-1 pt-1 font-medium">
                    <Link href="/sign-in">
                      <p className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 cursor-pointer">
                        Sign In
                      </p>
                    </Link>
                  </div>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={openCart}
                >
                  <span className="sr-only">View Cart</span>
                  <div className="flex">
                    <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
                    <CartItemCount />
                  </div>
                </button>
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Current: "bg-green-50 border-green-500 text-green-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0" />
              </div>
              {user ? (
                <div className="mt-3 space-y-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    Your Profile
                  </a>

                  <button
                    type="button"
                    href="#"
                    className="text-left block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-full"
                    onClick={signOut}
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="mt-3 space-y-1">
                  <Link href="/sign-in">
                    <p className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 cursor-pointer">
                      Sign In
                    </p>
                  </Link>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
