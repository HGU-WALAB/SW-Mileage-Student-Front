// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
import ChartTabs from 'src/components/dashboard/ChartTabs';
import { Title } from 'src/css/styled-components/Title';
import { Layout } from 'src/css/styled-components/Layout';
import { Alert, AlertTitle } from '@mui/material';
import { Content, ContentBox } from 'src/css/styled-components/Content';
import { useQuery } from '@tanstack/react-query';
import { getTotalPointCompChart } from 'src/apis/chart';
import React from 'react';

// ----------------------------------------------------------------------

export default function TwoView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Layout>
        <Title> 마일리지 통계 자료 </Title>
        <ChartTabs />

        {/* <Box
          sx={{
            mt: 5,
            width: 1,
            height: 320,
            borderRadius: 2,
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
            border: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        /> */}
      </Layout>
    </Container>
  );
}
