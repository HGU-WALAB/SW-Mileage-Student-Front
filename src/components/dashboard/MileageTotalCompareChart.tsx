import { Box } from '@mui/material';
import { LineChart } from '@mui/x-charts';

const data = {
  myTotalScore: [100, 120, 80, 200, 150],
  studentsAvgTotalScore: [110, 120, 70, 150, 180],
};

export default function MileageTotalCompareChart() {
  return (
    <Box sx={{ width: '300px', height: '300px' }}>
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
        height={500}
      />
    </Box>
  );
}
