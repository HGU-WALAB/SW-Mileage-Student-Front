// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { useSettingsContext } from 'src/components/settings';
import MyMileageTable from 'src/components/dashboard/MyMileageTable';

// ----------------------------------------------------------------------

export default function FiveView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> 나의 마일리지 </Typography>
      <MyMileageTable />
    </Container>
  );
}
