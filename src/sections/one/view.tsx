// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import { Button, Modal } from '@mui/material';
import TermsOfUse from 'src/components/apply/TermsOfUse';
import React from 'react';
import { useRecoilState } from 'recoil';
import { IsShowStudentApplyModalState } from 'src/utils/atom';
import ApplyFormModal from 'src/components/apply/ApplyFormModal';
import BeforeApply from 'src/components/apply/BeforeApply';
import { Title } from 'src/css/styled-components/Title';
import { Layout } from 'src/css/styled-components/Layout';
import { Content } from 'src/css/styled-components/Content';

// ----------------------------------------------------------------------

export default function OneView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Layout>
        <Title> SW 마일리지 신청 </Title>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Content> 현재 마일리지 신청 기간입니다. </Content>
          <Content> 신청 기간은 9월 1일 ~ 9월 30일 까지 입니다. (D-30) </Content>
        </Box>
        <ApplyFormModal thisSemesterItemNum={7} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <BeforeApply />
        </Box>
        {/* <Box sx={{ display: 'flex' }}> */}
        {/* <Box
            sx={{
              width: '350px',

              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography>신청 까지 D-30일</Typography>
            <Typography>신청 마감까지 D-50일</Typography>
          </Box> */}
        <Box
        // sx={{
        //   width: '350px',
        // }}
        >
          <TermsOfUse thisSemesterItemNum={7} />
        </Box>
        {/* </Box> */}
      </Layout>
    </Container>
  );
}
