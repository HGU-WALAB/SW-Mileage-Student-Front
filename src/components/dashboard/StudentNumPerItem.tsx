import { Box, Chip } from '@mui/material';
import { LineChart } from '@mui/x-charts';

export const sx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '50px',
  mt: '50px',
};

const Data = [5, 8, 5, 2, 10, 1, 0];
const xLabels = [
  'TOPCIT 성적 우수자',
  '대경권 프로그래밍 대회',
  '캡스톤 프로젝트',
  '자격증 및 기타 실적',
  'PPS 캠프',
  '웹 서비스 캠프',
  '전전 스터디',
];
export default function StudentNumPerItem() {
  return (
    <Box sx={sx}>
      <LineChart
        width={1000}
        height={400}
        series={[{ data: Data, label: '등록된 학생 수' }]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
      />
    </Box>
  );
}
