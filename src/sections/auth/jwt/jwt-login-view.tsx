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
import { useRouter } from 'src/routes/hooks';
// config
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { IPostStudentLoginData, studentLogin } from 'src/apis/user';
import { useSetRecoilState } from 'recoil';
import { userState } from 'src/utils/atom';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { enqueueSnackbar } = useSnackbar();
  const setUserInfo = useSetRecoilState(userState);

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    sid: Yup.string().required('필수 항목 입니다.'),
    password: Yup.string()
      .matches(/^[^\uAC00-\uD7A3]*$/, '비밀번호에 한글을 사용할 수 없습니다.')
      .required('필수 항목 입니다.'),
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
        enqueueSnackbar('로그인 성공', {
          variant: 'success',
          autoHideDuration: 3000,
        });

        localStorage.setItem('accessToken', res.data.token);
        console.log(res);
        // console.log({ name: res.data.name, sid: res.data.sid });
        setUserInfo({ name: res.data.name, sid: res.data.sid });
      });

      // await login?.(data.email, data.password);

      router.push('/dashboard');
    } catch (error) {
      enqueueSnackbar('로그인 정보가 틀렸습니다', {
        variant: 'error',
        autoHideDuration: 1000,
      });

      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4"> 로그인</Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {/* {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>} */}

      <RHFTextField name="sid" label="학번" />

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
        style={{ imeMode: 'disabled' }}
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
