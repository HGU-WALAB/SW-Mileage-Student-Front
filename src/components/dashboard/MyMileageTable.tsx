import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Box } from '@mui/material';

export default function MyMileageTable() {
  //   const { data } = useDemoData({
  //     dataSet: 'Commodity',
  //     rowLength: 5,
  //     maxColumns: 6,
  //   });

  const data = {
    columns: [
      {
        field: 'id',
        headerName: '번호',
        width: 100,
      },
      {
        field: 'semester',
        headerName: '학기',
        width: 100,
      },
      {
        field: 'itemName',
        headerName: '항목명',
        width: 200,
      },
      {
        field: 'point',
        headerName: '포인트',
        width: 100,
      },
      {
        field: 'description',
        headerName: '설명',
        width: 300,
      },
      {
        field: 'regDate',
        headerName: '등록 날짜',
        width: 100,
      },
    ],

    rows: [
      {
        id: 1,
        semester: '2021-1',
        itemName: 'TOPCIT 성적 우수자',
        point: 20,
        description: 'TOPCIT 성적 우수자입니다.',
        regDate: '2021-10-10',
      },
      {
        id: 2,
        semester: '2021-1',
        itemName: '대경권 프로그래밍 대회',
        point: 20,
        description: '대경권 프로그래밍 대회입니다.',
        regDate: '2021-10-10',
      },
      {
        id: 3,
        semester: '2021-1',
        itemName: '캡스톤 프로젝트',
        point: 100,
        description: '캡스톤 프로젝트입니다.',
        regDate: '2021-10-10',
      },
      {
        id: 4,
        semester: '2021-1',
        itemName: '자격증 및 기타 실적',
        point: 50,
        description: '자격증 및 기타 실적입니다.',
        regDate: '2021-10-10',
      },
      {
        id: 5,
        semester: '2021-1',
        itemName: 'PPS 캠프',
        point: 15,
        description: 'PPS 캠프입니다.',
        regDate: '2021-10-10',
      },
      {
        id: 6,
        semester: '2021-1',
        itemName: '웹 서비스 캠프',
        point: 70,
        description: '웹 서비스 캠프입니다.',
        regDate: '2021-10-10',
      },
      {
        id: 7,
        semester: '2021-1',
        itemName: '전전 스터디',
        point: 100,
        description: '전전 스터디입니다.',
        regDate: '2021-10-10',
      },
    ],
  };

  console.log(data);
  return (
    <Box sx={{ width: '100%', maxHeight: '700px', py: '50px' }}>
      <DataGrid {...data} />
    </Box>
  );
}
