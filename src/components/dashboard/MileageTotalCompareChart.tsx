import { Box } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { sx } from './StudentNumPerItem';

const data = {
  myTotalScore: [100, 120, 80, 130, 110],
  studentsAvgTotalScore: [110, 120, 70, 120, 140],
};

export default function MileageTotalCompareChart() {
  return (
    <Box sx={sx}>
      {/* <Chip label="" color="primary" /> */}
      {/* <Chip label="" color="primary" /> */}
      <LineChart
        series={[
          { curve: 'linear', data: data.myTotalScore, label: '나의 마일리지 총점' },
          { curve: 'linear', data: data.studentsAvgTotalScore, label: '평균 마일리지 총점' },
        ]}
        xAxis={[
          {
            data: ['2021-02', '2022-01', '2022-02', '2023-01', '2023-02'],

            scaleType: 'point',
          },
        ]}
        width={1000}
        height={400}
      />
    </Box>
  );
}
