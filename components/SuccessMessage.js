/* eslint-disable react/prop-types */
import { CheckCircleIcon } from '@heroicons/react/solid';

export default function SuccessMessage({ title, message, children }) {
  return (
    <div className="rounded-md bg-green-50 p-4">
      <div className="flex ">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-8 w-8 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-green-800">{title}</h3>
          <div className="mt-2 text-sm text-green-700">
            <p>{message}</p>
            <p>{children}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
