import { Helmet } from 'react-helmet-async';
// sections
import FiveView from 'src/sections/five/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>내 마일리지</title>
      </Helmet>

      <FiveView />
    </>
  );
}
