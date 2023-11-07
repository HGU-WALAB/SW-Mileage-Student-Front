import { Helmet } from 'react-helmet-async';
// sections
import { JwtLoginView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>SW 마일리지 학생 시스템 로그인</title>
      </Helmet>

      <JwtLoginView />
    </>
  );
}
