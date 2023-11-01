// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
import TermsOfUse from 'src/components/apply/TermsOfUse';
import React, { useEffect, useState } from 'react';
import ApplyFormModal from 'src/components/apply/ApplyFormModal';
import BeforeApply from 'src/components/apply/BeforeApply';
import { Title } from 'src/css/styled-components/Title';
import { Layout } from 'src/css/styled-components/Layout';
import { Content, ContentBox } from 'src/css/styled-components/Content';
// import { useQuery } from 'react-query';
import { getAllMileageThisSemester } from 'src/apis/mileage';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { canRegisterState } from 'src/utils/atom';

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

interface ICanRegister {
  applyStart?: string;
  applyEnd?: string;
}
export default function OneView() {
  const canRegister = useRecoilValue(canRegisterState);

  const settings = useSettingsContext();

  const [updatedAt, setUpdatedAt] = React.useState(0);

  const { data, dataUpdatedAt } = useQuery<IGetThisSemesterItem>({
    queryKey: ['thisSemesterItem'],
    queryFn: async () => {
      const response = await getAllMileageThisSemester('2023-01');
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
        {canRegister && (
          <ContentBox>
            <Content> 현재 마일리지 신청 기간입니다. </Content>
            <Content>
              {' '}
              신청 기간은 parseMonthAndDay(canRegister.applyStart) ~
              parseMonthAndDay(canRegister.applyEnd) 까지 입니다. daysBetween(
              {(canRegister as ICanRegister)?.applyStart},{(canRegister as ICanRegister)?.applyEnd})
            </Content>
          </ContentBox>
        )}
        <ApplyFormModal
          data={data as IGetThisSemesterItem}
          thisSemesterItemNum={data?.count as number}
        />
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
      </Layout>
    </Container>
  );
}
