import { Alert, AlertTitle } from '@mui/material';
import { Content, ContentBox } from 'src/css/styled-components/Content';

interface IProps {
  index: number;
}

export default function ChartInfo({ index }: IProps) {
  const infoTitle = () => {
    switch (index) {
      case 0:
        return '마일리지 총점 비교';
      case 1:
        return '마일리지 타입별 비교';
      case 2:
        return '마일리지 인기 항목';
      case 3:
        return '나의 마일리지 타입별 분포';
      default:
        return 'undefined Title';
    }
  };

  const infoContent = () => {
    switch (index) {
      case 0:
        return '나의 마일리지를 학생들 평균 치와 비교해 보세요';
      case 1:
        return '나의 마일리지를 타입 별로 비교해 보세요';
      case 2:
        return '학생들이 많이 활동한 마일리지를 보여줍니다';
      case 3:
        return '나의 마일리지가 현재 최대치로부터 얼마나 충족 되었는 지 타입 별로 보여줍니다.';
      default:
        return 'undefined Content';
    }
  };

  return (
    <Alert severity="info" sx={{ width: '550px' }}>
      <AlertTitle>{infoTitle()}</AlertTitle>
      <ContentBox>
        <Content sx={{ display: 'flex', gap: '5px', fontSize: '15px' }}>{infoContent()}</Content>
      </ContentBox>
    </Alert>
  );
}
