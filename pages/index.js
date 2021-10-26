import { useQuery } from '@apollo/client';
import Product from '../components/Product';
import { CURRENT_USER_QUERY } from '../components/User';
import { listProducts } from '../graphql/Queries';

export default function Home() {
  const { data, error, loading } = useQuery(listProducts);
  console.log(data);
  const { data: user } = useQuery(CURRENT_USER_QUERY);
  console.log(user);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col items-center min-h-screen py-2 z-0 ">
      <div className="bg-green-600 -skew-x-6 ">
        <h3 className="lg:text-3xl md:text-2xl text-xl  text-white font-light py-6 px-2 shadow-lg ">
          Lupe and Stephanie's Tamale Orders
        </h3>
      </div>
      <div className="my-10">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.products.map((product) => (
            <Product product={product} />
          ))}
        </ul>
      </div>
    </div>
  );
}
