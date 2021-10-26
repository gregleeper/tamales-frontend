import { XCircleIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';

const DisplayError = ({ error }) => {
  console.log({ error });
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <div className="rounded-md bg-red-50 p-4" key={i}>
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              There were 2 errors with your submission
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p data-test="graphql-error">
                {error.message.replace('GraphQL error: ', '')}
              </p>
            </div>
          </div>
        </div>
      </div>
    ));
  }
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            There were errors with your submission:
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p data-test="graphql-error">
              {error.message.replace('GraphQL error: ', '')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

DisplayError.defaultProps = {
  error: {},
};

DisplayError.propTypes = {
  error: PropTypes.object,
};

export default DisplayError;
