import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import ErrorMessage from '../../components/ErrorMessage';

import formatMoney from '../../lib/formatMoney';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($where: OrderWhereUniqueInput!) {
    order(where: $where) {
      id
      charge
      total
      user {
        id
        email
        name
        phone
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;
export default function SingleOrderPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: { where: { id } },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { order } = data;
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <Head>
          <title cl>Tamales - {order.id}</title>
        </Head>
        <div className="grid grid-cols-6 gap-10 place-content-center">
          <div className="col-span-3">
            <h5 className="text-2xl font-semibold text-gray-900">
              <span>Order Id: </span> <span>{order.id}</span>
            </h5>
            <p>
              <span>Charge Id: </span>
              <span>{order.charge}</span>
            </p>
            <p>
              <span>Order Total:</span>
              <span>{formatMoney(order.total)}</span>
            </p>
            <p>
              <span>ItemCount:</span>
              <span>{order.items.length}</span>
            </p>
          </div>
          <div>
            <p className="text-gray-900 font-medium text-lg">
              {order.user.name}
            </p>
            <p>{order.user.email}</p>
            <p>{order.user.phone}</p>
          </div>
        </div>
        <ul className="py-2">
          {order.items.map((item) => (
            <li
              className="grid grid-cols-12 gap-2 border border-gray-400 place-content-center rounded-lg bg-gray-50 inset-2"
              key={item.id}
            >
              <div className="col-span-2 p-8">
                <Image
                  src={item.photo.image.publicUrlTransformed}
                  alt={item.title}
                  width="150"
                  height="150"
                  layout="fixed"
                />
              </div>
              <div className="col-span-6 py-8">
                <h6 className="text-lg font-medium text-gray-900">
                  {item.name}
                </h6>
                <p className="text-gray-900">Qty: {item.quantity} dozen</p>
                <p className="text-gray-900">
                  Each Dozen: {formatMoney(item.price)}
                </p>

                <p className="text-gray-900">{item.description}</p>
              </div>
              <div className="col-span-2 py-8">
                <p className="text-gray-900 font-medium">
                  Sub Total: {formatMoney(item.price * item.quantity)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
