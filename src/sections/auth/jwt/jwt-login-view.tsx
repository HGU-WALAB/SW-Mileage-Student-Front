import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { IPostStudentLoginData, studentLogin } from 'src/apis/user';
import { useSetRecoilState } from 'recoil';
import { userState } from 'src/utils/atom';
import { Link } from 'react-router-dom';
import { _emails } from '../../../_mock/assets';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const setUserInfo = useSetRecoilState(userState);

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    sid: Yup.string().required('필수 항목 입니다.'),
    password: Yup.string().required('필수 항목 입니다.'),
  });

  const defaultValues = {
    sid: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const loginData: IPostStudentLoginData = {
        uniqueId: data.sid,
        password: data.password,
      };

      await studentLogin(loginData).then((res) => {
        localStorage.setItem('accessToken', res.data.token);
        console.log(res);
        // console.log({ name: res.data.name, sid: res.data.sid });
        setUserInfo({ name: res.data.name, sid: res.data.sid });
      });

      // await login?.(data.email, data.password);

      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">마일리지 학생 시스템</Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="sid" label="히즈넷 아이디" />

      <RHFTextField
        name="password"
        label="히즈넷 비밀번호"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Link
        to="https://hisnet.handong.edu/"
        style={{ color: 'inherit', display: 'flex', justifyContent: 'end' }}
        target="_blank"
      >
        <Typography variant="body2" color="inherit">
          히즈넷 가기
        </Typography>
      </Link>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        로그인
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      <Alert severity="info" sx={{ mb: 3 }}>
        히즈넷 아이디/비밀번호로 로그인 하세요
      </Alert>

      {renderForm}
    </FormProvider>
  );
}
