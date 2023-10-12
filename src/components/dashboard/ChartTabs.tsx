import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { LabelColor } from '../label/types';
import { varBgColor } from '../animate/variants/background';
import { ColorSchema } from '../../theme/palette';
import MileageTotalCompareChart from './MileageTotalCompareChart';
import MileageTotalRankChart from './MileageTotalRankChart';
import StudentNumPerItem from './StudentNumPerItem';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ChartTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="총점 비교" {...a11yProps(0)} />
          <Tab label="총점 순위" {...a11yProps(1)} />
          <Tab label="항목 별 학생 수" {...a11yProps(2)} />
          <Tab label="항목 별 포인트" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <MileageTotalCompareChart />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MileageTotalRankChart />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <StudentNumPerItem />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={3}>
        항목 별 포인트
      </CustomTabPanel>
    </Box>
  );
}
