// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
import MyMileageTable from 'src/components/dashboard/MyMileageTable';
import SemesterDropdown from 'src/components/common/SemesterDropdown';
import { Box, Chip } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { mileageStatusState, semesterState } from 'src/utils/atom';
import { Layout } from 'src/css/styled-components/Layout';
import { Title } from 'src/css/styled-components/Title';
import { IMileageSemesterWithStatus, getSemestersWithStatus } from 'src/apis/mileage';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function FiveView() {
  const semester = useRecoilValue(semesterState);
  const status = useRecoilValue(mileageStatusState);
  const settings = useSettingsContext();
  const [semesters, setSemesters] = useState<string[]>(['학기 미정']);

  useEffect(() => {
    const asyncFetch = async () => {
      const res = await getSemestersWithStatus();
      console.log(res.data);
      setSemesters([
        '학기 미정',
        ...res.data.list.map((e: IMileageSemesterWithStatus) => e.semester),
      ]);
    };
    asyncFetch();
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Layout>
        <Title> 나의 마일리지 </Title>

        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <SemesterDropdown semesters={semesters} />
          <Chip label={semester} color="primary" variant="soft" />
          <Chip label={status} color="primary" variant="soft" />
        </Box>

        <MyMileageTable />
      </Layout>
    </Container>
  );
}
