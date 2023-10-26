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

// ----------------------------------------------------------------------

export default function OneView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> 마일리지 신청 </Typography>
      <TermsOfUse thisSemesterItemNum={7} />
      <ApplyFormModal thisSemesterItemNum={7} />
      <BeforeApply />
    </Container>
  );
}
