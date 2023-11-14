import { Box } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
import React from 'react';
import { getTotalPointCompChart } from 'src/apis/chart';
import { useQuery } from '@tanstack/react-query';
import { sx } from './StudentNumPerItem';

// const data = [
//   {
//     name: '2020-02',
//     '마일리지 총합 평균': 1890,
//     '내 마일리지 총합': 4800,
//   },
//   {
//     name: '2020-01',
//     '마일리지 총합 평균': 2390,
//     '내 마일리지 총합': 3800,
//   },
//   {
//     name: '2021-02',
//     '마일리지 총합 평균': 1890,
//     '내 마일리지 총합': 4800,
//   },
//   {
//     name: '2021-01',
//     '마일리지 총합 평균': 2390,
//     '내 마일리지 총합': 3800,
//   },
//   {
//     name: '2022-01',
//     '마일리지 총합 평균': 4000,
//     '내 마일리지 총합': 2400,
//   },
//   {
//     name: '2022-02',
//     '마일리지 총합 평균': 3000,
//     '내 마일리지 총합': 1398,
//   },
//   {
//     name: '2023-01',
//     '마일리지 총합 평균': 2000,
//     '내 마일리지 총합': 9800,
//   },
//   {
//     name: '2023-02',
//     '마일리지 총합 평균': 2780,
//     '내 마일리지 총합': 3908,
//   },
// ];

// const data = {
//   "내 마일리지 총합"Score: [100, 120, 80, 130, 110],
//   studentsAvgTotalScore: [110, 120, 70, 120, 140],
// };

export default function MileageTotalCompareChart() {
  const [updatedAt, setUpdatedAt] = React.useState(0);

  const { data, dataUpdatedAt } = useQuery({
    queryKey: ['totalPointCompChart'],
    queryFn: async () => {
      const response = await getTotalPointCompChart();
      return response.data.list;
    },
  });

  React.useEffect(() => {
    if (dataUpdatedAt > updatedAt) {
      setUpdatedAt(dataUpdatedAt);
    }
  }, [updatedAt, dataUpdatedAt]);

  return (
    <Box sx={sx}>
      <AreaChart
        width={1000}
        height={400}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="coloruv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorpv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="마일리지 총합 평균"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#coloruv)"
        />
        <Area
          type="monotone"
          dataKey="내 마일리지 총합"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorpv)"
        />
      </AreaChart>
    </Box>
  );
}
