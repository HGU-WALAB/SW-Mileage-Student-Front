// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import MyMileageTable from 'src/components/dashboard/MyMileageTable';
import SemesterDropdown from 'src/components/common/SemesterDropdown';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function FiveView() {
  const settings = useSettingsContext();

  const semesters = ['2022-01', '2022-02', '2023-01', '2023-02'];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> 나의 마일리지 </Typography>
      <Box sx={{ height: '20px' }} />
      <SemesterDropdown semesters={semesters} />
      <MyMileageTable />
    </Container>
  );
}
