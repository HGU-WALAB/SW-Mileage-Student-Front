// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
import TermsOfUse from 'src/components/apply/TermsOfUse';
import React from 'react';
import ApplyFormModal from 'src/components/apply/ApplyFormModal';
import BeforeApply from 'src/components/apply/BeforeApply';
import { Title } from 'src/css/styled-components/Title';
import { Layout } from 'src/css/styled-components/Layout';
// import { useQuery } from 'react-query';
import { getAllMileageThisSemester } from 'src/apis/mileage';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';
import { thisSemesterState } from 'src/utils/atom';
import axiosInstance from 'src/utils/axios';
import ApplyDuration from 'src/components/apply/ApplyDuration';

// ----------------------------------------------------------------------

interface IGetThisSemesterItem {
  count: number;
  list: IThisSemesterItemWithCategory[];
}

interface IThisSemesterItemWithCategory {
  category: string;
  items: IItem[];
}

interface IItem {
  id: number; // 번호
  itemName: string; // 항목명
  description: string; // 비고
  isRegistered: boolean;
}

export default function OneView() {
  const setThisSemester = useSetRecoilState(thisSemesterState);

  const settings = useSettingsContext();

  const [updatedAt, setUpdatedAt] = React.useState(0);

  const { data, dataUpdatedAt } = useQuery<IGetThisSemesterItem>({
    queryKey: ['thisSemesterItem'],
    queryFn: async () => {
      const res = await axiosInstance.get('api/mileage/semesters/currentSemester');
      setThisSemester(res.data.data.name);
      console.log(res.data.data.name);
      const response = await getAllMileageThisSemester(res.data.data.name);
      console.log(response.data);
      return response.data; // Axios의 응답에서 .data 속성을 반환
    },
  });

  React.useEffect(() => {
    if (dataUpdatedAt > updatedAt) {
      setUpdatedAt(dataUpdatedAt);
    }
  }, [updatedAt, dataUpdatedAt]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Layout>
        <Title> SW 마일리지 신청 </Title>
        <ApplyDuration />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <BeforeApply />
        </Box>

        <Box>
          <TermsOfUse thisSemesterItemNum={data?.count as number} />
        </Box>
        <ApplyFormModal
          data={data as IGetThisSemesterItem}
          thisSemesterItemNum={data?.count as number}
        />
      </Layout>
    </Container>
  );
}
