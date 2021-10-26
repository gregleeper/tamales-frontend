/* eslint-disable react/prop-types */
import { useRouter } from 'next/dist/client/router';
import RequestReset from '../components/RequestReset';
import Reset from '../components/ResetPassword';

export default function ResetPage() {
  const router = useRouter();
  const { token } = router.query;
  console.log(token);
  if (!token) {
    return (
      <div>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <Reset token={token} />
    </div>
  );
}
