// @mui
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
import MyMileageTable from 'src/components/dashboard/MyMileageTable';
import SemesterDropdown from 'src/components/common/SemesterDropdown';
import { Box, Chip } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { mileageStatusState, semesterWithStatusState } from 'src/utils/atom';
import { Layout } from 'src/css/styled-components/Layout';
import { Title } from 'src/css/styled-components/Title';
import { IMileageSemesterWithStatus, getSemestersWithStatus } from 'src/apis/mileage';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// ----------------------------------------------------------------------

export interface ISemesterWithStatus {
  name: string;
  status: string;
}

export default function FiveView() {
  const semesterWithStatus = useRecoilValue(semesterWithStatusState);

  const status = useRecoilValue(mileageStatusState);
  const settings = useSettingsContext();
  const [semestersWithStatus, setSemestersWithStatus] = useState<ISemesterWithStatus[]>([]);
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

  useEffect(() => {
    const asyncFetch = async () => {
      const res = await getSemestersWithStatus();
      console.log(res.data);
      setSemestersWithStatus([
        { name: '학기 미정', status: '진행 상태 없음' },
        ...res.data.list.map((e: IMileageSemesterWithStatus) => ({
          name: e?.name,
          status: e?.status,
        })),
      ]);
    };
    asyncFetch();
  }, []);

  //
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Layout>
        <Title> 나의 마일리지 </Title>

        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <SemesterDropdown semestersWithStatus={semestersWithStatus} />
          <Chip label={semesterWithStatus.name} color="primary" variant="soft" />
          <Chip label={semesterWithStatus.status} color="primary" variant="soft" />
        </Box>

        <MyMileageTable />
      </Layout>
    </Container>
  );
}
