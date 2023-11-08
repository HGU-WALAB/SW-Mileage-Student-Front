import { Alert, AlertTitle, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { Content, ContentBox } from 'src/css/styled-components/Content';
import { canRegisterState } from 'src/utils/atom';
import { daysBetween, parseMonthAndDay } from 'src/utils/converter/dateConverter';

interface ICanRegister {
  applyStart?: string;
  applyEnd?: string;
}

export default function ApplyDuration() {
  const canRegister = useRecoilValue<ICanRegister | null>(canRegisterState);

  return (
    <>
      {canRegister ? (
        <Alert severity="success">
          <AlertTitle>
            마일리지 신청 기간 [D-
            {daysBetween(canRegister.applyStart, canRegister.applyEnd)}]
          </AlertTitle>

          <ContentBox>
            <Content sx={{ display: 'flex', gap: '5px', fontSize: '15px' }}>
              {' '}
              신청 기간은 {parseMonthAndDay(canRegister.applyStart)} ~
              {parseMonthAndDay(canRegister.applyEnd)} 까지 입니다.{' '}
            </Content>
          </ContentBox>
        </Alert>
      ) : (
        <Alert severity="warning">
          <ContentBox>
            <Content sx={{ fontSize: '15px' }}> 현재 마일리지 신청 기간이 아닙니다 </Content>
          </ContentBox>
        </Alert>
      )}
    </>
  );
}
