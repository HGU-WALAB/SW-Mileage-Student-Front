import { Avatar, Card, CardContent, CardHeader, Theme, Typography } from '@mui/material';
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const sx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '50px',
};

const data = [
  {
    name: 'PPS 캠프',
    '마일리지 항목': 2400,
    type: 'A',
    description: 'PPS 캠프에 대한 설명입니다.',
    rank: '1',
  },
  {
    name: '웹 서비스 캠프',
    '마일리지 항목': 1398,
    type: 'A',
    description: '웹 서비스 캠프에 대한 설명입니다.',
    rank: '2',
  },
  {
    name: '코딩 테스트 활동',
    '마일리지 항목': 9800,
    type: 'B',
    description: '코딩 테스트에 대한 설명입니다.',
    rank: '3',
  },
  {
    name: '강연',
    '마일리지 항목': 3908,
    type: 'B',
    description: '강연에 대한 설명입니다.',
    rank: '4',
  },
  {
    name: '종강 총회',
    '마일리지 항목': 4800,
    type: 'C',
    description: '종강 총회에 대한 설명입니다.',
    rank: '5',
  },
  {
    name: '캡스톤 디자인1',
    '마일리지 항목': 3800,
    type: 'E',
    description: '캡스톤 디자인1에 대한 설명입니다.',
    rank: '6',
  },
  {
    name: '캡스톤 디자인2',
    '마일리지 항목': 4300,
    type: 'B',
    description: '캡스톤 디자인2에 대한 설명입니다.',
    rank: '7',
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card sx={{ maxWidth: 345, opacity: '0.9' }}>
        <CardHeader
          avatar={
            <Avatar color="primary" aria-label="recipe">
              {payload[0].payload.rank}
            </Avatar>
          }
          title={label}
          subheader={`${payload[0].value} 명`}
        />

        <CardContent>
          <Typography variant="body2"> 마일리지 타입 : {payload[0].payload.type}</Typography>
          <Typography variant="body2" color="text.secondary">
            {payload[0].payload.description}
          </Typography>
        </CardContent>
      </Card>
      // <div className="custom-tooltip">
      //   <p className="label">{`${label} : ${payload[0].value}`}</p>
      //   <p className="intro">마일리지 타입 : {payload[0].payload.type}</p>
      //   <p className="desc">{payload[0].payload.description}</p>
      // </div>
    );
  }

  return null;
};

interface StudentNumPerItemProps {
  theme: Theme;
}
export default class StudentNumPerItem extends PureComponent<StudentNumPerItemProps> {
  // eslint-disable-next-line react/state-in-constructor
  // state = {
  //   data: null,
  // };

  // componentDidMount() {
  //   this.fetchData();
  // }

  // fetchData = async () => {
  //   try {
  //     const response = await getMyCategoryTypeCompChart();
  //     const formattedData = response.data?.list?.map(item => ({
  //       type: item?.type,
  //       나: item?.myMileage,
  //       평균: item?.averageMileage,
  //     }));

  //     this.setState({ data: formattedData, isLoading: false });
  //   }
  // };

  render() {
    const { theme } = this.props;
    // const { data } = this.state;

    return (
      // <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={1000}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="마일리지 항목" barSize={30} fill={theme.palette.primary.main} />
      </BarChart>
      // </ResponsiveContainer>
    );
  }
}
