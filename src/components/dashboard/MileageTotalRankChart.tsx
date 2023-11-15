import React, { useState } from 'react';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { ResponsiveRadar } from '@nivo/radar';

import { getCategoryTypeCompChart } from 'src/apis/chart';
import { ICategoryTypeCompChartReqData } from 'src/utils/endPoints';
import { semesterWithStatusState } from 'src/utils/atom';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import SemesterDropdown from '../common/SemesterDropdown';

// const barChartsParams = {
//   xAxis: [
//     {
//       data: [
//         '1',
//         '2',
//         '3',
//         '4',
//         '5',
//         '6',
//         '7',
//         '8',
//         '9',
//         '10',
//         '11',
//         '12',
//         '13',
//         '14',
//         '15',
//         '16',
//         '17',
//         '18',
//         '19',
//         '20',
//         '21',
//         '22',
//         '23',
//         '24',
//         '25',
//         '26',
//         '27',
//         '28',
//         '29',
//         '30',
//       ].map((num) => checkMe(num)),
//       scaleType: 'band' as const,
//     },
//   ],
//   series: [
//     {
//       data: [
//         10, 9, 9, 9, 8, 8, 8, 7, 7, 7, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1,
//       ],
//       stack: '1',
//       label: 'Type A',
//     },
//     {
//       data: [
//         10, 9, 9, 9, 8, 8, 8, 7, 7, 7, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1,
//       ],
//       stack: '1',
//       label: 'Type B',
//     },
//     {
//       data: [
//         10, 9, 9, 9, 8, 8, 8, 7, 7, 7, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1,
//       ],
//       stack: '1',
//       label: 'Type C',
//     },
//     {
//       data: [
//         10, 9, 9, 9, 8, 8, 8, 7, 7, 7, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1,
//       ],
//       stack: '1',
//       label: 'Type D',
//     },
//     {
//       data: [
//         10, 9, 9, 9, 8, 8, 8, 7, 7, 7, 6, 6, 6, 5, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1,
//       ],
//       stack: '1',
//       label: 'Type E',
//     },
//   ],
//   margin: { top: 10, right: 10 },
//   sx: {
//     // [`& .${legendClasses.root}`]: {
//     //   display: 'none',
//     // },
//   },
//   height: 300,
// };

// const data = [
//   {
//     taste: ' A',
//     // chardonay: 25,
//     평균: 111,
//     나: 73,
//   },
//   {
//     taste: ' B',
//     // chardonay: 88,
//     평균: 108,
//     나: 45,
//   },
//   {
//     taste: ' C',
//     // chardonay: 49,
//     평균: 63,
//     나: 34,
//   },
//   {
//     taste: ' D',
//     // chardonay: 109,
//     평균: 102,
//     나: 113,
//   },
//   {
//     taste: ' E',
//     // chardonay: 51,
//     평균: 100,
//     나: 98,
//   },
// ];

const sx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default function MileageTotalRankChart() {
  const semesterWithStatus = useRecoilValue(semesterWithStatusState);

  const [isYearFilter, setIsYearFilter] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsYearFilter(event.target.checked);
  };

  const { data, refetch } = useQuery({
    queryKey: ['CategoryTypeCompChart'],
    queryFn: async () => {
      if (semesterWithStatus.name === '학기 미정') return [];
      const resData: ICategoryTypeCompChartReqData = {
        isYearFilter,
        semester: semesterWithStatus.name,
      };
      const response = await getCategoryTypeCompChart(resData);

      return response.data?.list?.map((item) => ({
        type: item?.type,
        나: item?.myMileage,
        평균: item?.averageMileage,
      }));

      // return [];
    },
  });

  React.useEffect(() => {
    refetch();
  }, [isYearFilter, semesterWithStatus, refetch]);

  return (
    <Box sx={sx}>
      <Box
        sx={{
          display: 'flex',
          gap: '30px',
          alignItems: 'center',
        }}
      >
        <SemesterDropdown />
        <FormControlLabel
          control={<Checkbox defaultChecked checked={isYearFilter} onChange={handleChange} />}
          label="같은 학년만 표시"
        />
      </Box>
      <Box sx={{ width: '500px', height: '500px' }}>
        {data && (
          <ResponsiveRadar
            data={data}
            keys={['나', '평균']}
            indexBy="type"
            valueFormat=">-.2f"
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            borderColor={{ from: 'color' }}
            gridLabelOffset={36}
            dotSize={4}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            colors={{ scheme: 'nivo' }}
            blendMode="multiply"
            motionConfig="wobbly"
            legends={[
              {
                anchor: 'top-left',
                direction: 'column',
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000',
                    },
                  },
                ],
              },
            ]}
          />
        )}
      </Box>
    </Box>
  );
}
