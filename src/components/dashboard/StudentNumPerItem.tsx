import { Avatar, Card, CardContent, CardHeader, Theme, Typography } from '@mui/material';
import { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getPopularItemChart } from 'src/apis/chart';

export const sx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '50px',
};

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
  state = {
    data: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await getPopularItemChart();
      const formattedData = response.data?.list?.map((item) => ({
        name: item.name,
        '등록된 학생 수': item.recordCount,
        type: item.type,
        description: item.description,
        rank: item.rank,
      }));

      this.setState({ data: formattedData });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { theme } = this.props;
    const { data } = this.state;

    return (
      // <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={1150}
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
        <XAxis dataKey="name" style={{ fontSize: '11px' }} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="등록된 학생 수" barSize={30} fill={theme.palette.primary.main} />
      </BarChart>
      // </ResponsiveContainer>
    );
  }
}
