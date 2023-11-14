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

// ----------------------------------------------------------------------

export default function TwoView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Layout>
        <Title> 마일리지 통계 자료 </Title>
        <ChartTabs />

        <Box sx={{ height: '50px' }} />
        <Alert severity="info">
          <AlertTitle>마일리지 총점 비교</AlertTitle>
          <ContentBox>
            <Content sx={{ display: 'flex', gap: '5px', fontSize: '15px' }}>
              나의 마일리지를 다른 학생들의 평균 마일리지와 비교해 보세요
            </Content>
          </ContentBox>
        </Alert>

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
