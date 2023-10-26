import { Box, Chip } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { sx } from './StudentNumPerItem';

const Data = [30, 50, 20, 40, 50, 80, 20];
const xLabels = [
  'TOPCIT 성적 우수자',
  '대경권 프로그래밍 대회',
  '캡스톤 프로젝트',
  '자격증 및 기타 실적',
  'PPS 캠프',
  '웹 서비스 캠프',
  '전전 스터디',
];
export default function PointPerItem() {
  return (
    <Box sx={sx}>
      <LineChart
        width={1000}
        height={400}
        series={[{ data: Data, label: '항목의 포인트' }]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
      />
    </Box>
  );
}
