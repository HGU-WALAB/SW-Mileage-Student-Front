import { Alert, AlertTitle } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { Content, ContentBox } from 'src/css/styled-components/Content';
import { canRegisterState } from 'src/utils/atom';
import { daysBetween, parseMonthAndDay } from 'src/utils/converter/dateConverter';

interface ICanRegister {
  applyStart?: string;
  applyEnd?: string;
  status?: string;
}

export default function ApplyDuration() {
  const canRegister = useRecoilValue<ICanRegister | null>(canRegisterState);
  console.log(canRegister);
  const renderAlertContent = () => {
    if (!canRegister) {
      // 적절한 처리 혹은 기본 반환값을 추가하세요
      return null;
    }

    switch (canRegister.status) {
      case '신청 가능':
        return (
          <Alert severity="success">
            <AlertTitle>
              마일리지 신청 기간 [D-{daysBetween(canRegister.applyStart, canRegister.applyEnd)}]
            </AlertTitle>
            <ContentBox>
              <Content sx={{ display: 'flex', gap: '5px', fontSize: '15px' }}>
                신청 기간은 {parseMonthAndDay(canRegister.applyStart)} ~
                {parseMonthAndDay(canRegister.applyEnd)} 까지 입니다.
              </Content>
            </ContentBox>
          </Alert>
        );
      case '신청 완료':
        return (
          <Alert severity="success">
            <ContentBox>
              <Content sx={{ fontSize: '15px' }}> 이미 신청을 완료 하셨습니다 </Content>
            </ContentBox>
          </Alert>
        );
      default:
        return (
          <Alert severity="warning">
            <ContentBox>
              <Content sx={{ fontSize: '15px' }}> 현재 마일리지 신청 기간이 아닙니다 </Content>
            </ContentBox>
          </Alert>
        );
    }
  };

  return <>{renderAlertContent()}</>;
}
