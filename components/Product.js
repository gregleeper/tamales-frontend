/* eslint-disable react/prop-types */
import Image from 'next/image';
import AddToCart from './AddToCart';

export default function Product({ product }) {
  return (
    <li key={product.id}>
      <div className="p-6 space-y-2er ">
        <div className="truncate">
          <div className="flex items-center justify-center space-x-3">
            <h6 className="text-gray-900 text-2xl font-medium truncate pb-4">
              {product.name}
            </h6>
          </div>

          <Image
            className=" rounded-2xl"
            src={product.photo.image.publicUrl}
            alt=""
            layout="responsive"
            width="200"
            height="200"
          />

          <p className="mt-1 text-gray-600 text-base px-2">
            {product.description}
          </p>
        </div>
        <div>
          <AddToCart id={product.id} />
        </div>
      </div>
    </li>
  );
}
