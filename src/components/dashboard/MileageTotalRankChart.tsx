import { BarChart } from '@mui/x-charts';
import React from 'react';
import { Box } from '@mui/material';
import { sx } from './StudentNumPerItem';

const myNum = '3';
const checkMe = (num: string) => {
  if (num === myNum) {
    return `${num}( 나 )`;
  }
  return num;
};

const barChartsParams = {
  xAxis: [
    {
      data: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
      ].map((num) => checkMe(num)),
      scaleType: 'band' as const,
    },
  ],
  series: [
    {
      data: [
        10, 9, 9, 9, 8, 8, 8, 7, 7, 7, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1,
      ],
      stack: '1',
      label: 'Type A',
    },
    {
      data: [
        10, 9, 9, 9, 8, 8, 8, 7, 7, 7, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1,
      ],
      stack: '1',
      label: 'Type B',
    },
    {
      data: [
        10, 9, 9, 9, 8, 8, 8, 7, 7, 7, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1,
      ],
      stack: '1',
      label: 'Type C',
    },
    {
      data: [
        10, 9, 9, 9, 8, 8, 8, 7, 7, 7, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1,
      ],
      stack: '1',
      label: 'Type D',
    },
    {
      data: [
        10, 9, 9, 9, 8, 8, 8, 7, 7, 7, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1,
      ],
      stack: '1',
      label: 'Type E',
    },
  ],
  margin: { top: 10, right: 10 },
  sx: {
    // [`& .${legendClasses.root}`]: {
    //   display: 'none',
    // },
  },
  height: 300,
};

export default function MileageTotalRankChart() {
  const [xHighlight] = React.useState<'band' | 'none' | 'line'>('band');

  const [yHighlight] = React.useState<'none' | 'line'>('none');
  return (
    <Box sx={sx}>
      <BarChart
        {...barChartsParams}
        axisHighlight={{ x: xHighlight, y: yHighlight }}
        width={1000}
        height={400}
      />
      ;
    </Box>
  );
}
