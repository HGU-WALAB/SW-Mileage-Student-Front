import { Helmet } from 'react-helmet-async';
// sections
import FourView from 'src/sections/four/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>프로필</title>
      </Helmet>

      <FourView />
    </>
  );
}
