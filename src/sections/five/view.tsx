// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
import MyMileageTable from 'src/components/dashboard/MyMileageTable';
import SemesterDropdown from 'src/components/common/SemesterDropdown';
import { Box, Chip } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { semesterWithStatusState } from 'src/utils/atom';
import { Layout } from 'src/css/styled-components/Layout';
import { Title } from 'src/css/styled-components/Title';

// ----------------------------------------------------------------------

export interface ISemesterWithStatus {
  name: string;
  status: string;
}

export default function FiveView() {
  const semesterWithStatus = useRecoilValue(semesterWithStatusState);

  const settings = useSettingsContext();

  // const [updatedAt, setUpdatedAt] = useState(0);

  // const { data, dataUpdatedAt } = useQuery<IMileageSemesterWithStatus[]>(
  //   {
  //     queryKey: ['semestersWithStatus'],
  //     queryFn: async () => {
  //       const response = await getSemestersWithStatus();
  //       return response.data;  // Axios의 응답에서 .data 속성을 반환
  //     }
  //   }
  // );

  // useEffect(() => {
  //   if (dataUpdatedAt > updatedAt) {
  //     setUpdatedAt(dataUpdatedAt)
  //   }
  // }, [dataUpdatedAt])

  //
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Layout>
        <Title> 나의 마일리지 </Title>

        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <SemesterDropdown />
          <Chip label={semesterWithStatus.name} color="primary" variant="soft" />
          <Chip label={semesterWithStatus.status} color="primary" variant="soft" />
        </Box>

        <MyMileageTable />
      </Layout>
    </Container>
  );
}
