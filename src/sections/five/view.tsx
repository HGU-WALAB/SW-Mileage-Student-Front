// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import MyMileageTable from 'src/components/dashboard/MyMileageTable';
import SemesterDropdown from 'src/components/common/SemesterDropdown';
import { Box, Chip } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { mileageStatusState, semesterState } from 'src/utils/atom';

// ----------------------------------------------------------------------

export default function FiveView() {
  const semester = useRecoilValue(semesterState);
  const status = useRecoilValue(mileageStatusState);
  const settings = useSettingsContext();

  const semesters = ['2022-01', '2022-02', '2023-01', '2023-02'];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ display: 'flex', gap: '20px' }}>
        <Typography variant="h4"> 나의 마일리지 </Typography>
        <Chip label={semester} color="primary" variant="outlined" />
        <Chip label={status} color="primary" variant="outlined" />
      </Box>
      <Box sx={{ height: '20px' }} />
      <SemesterDropdown semesters={semesters} />
      <MyMileageTable />
    </Container>
  );
}
